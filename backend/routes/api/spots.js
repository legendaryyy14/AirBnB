const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth} = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("City is required"),
    check("state")
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check("lat")
      .exists({ checkFalsy: true })
      .withMessage("Latitude is not valid"),
    check("lng")
      .exists({ checkFalsy: true })
      .withMessage("Longitude is not valid"),
    check("name")
      .exists({ checkFalsy: true })
      .withMessage("Name must be less than 50 characters"),
    check("description")
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
    check("price")
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
    handleValidationErrors
  ];

  const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

//Get All Spots
router.get('/', async (req, res) => {

  let { page, size } = req.query;

  if (!page) page = 1;
  if (!size) size = 20;
  if (page > 10) page = 1;
  if (size > 20) size = 20;

  page = parseInt(page);
  size = parseInt(size);

  let pagination = {
      limit: size,
      offset: size * (page - 1)
  }
  let results = {}
  let avgRating = sequelize.fn('AVG', sequelize.col('Reviews.stars'));
    const spotsArr = await Spot.findAll();
    const spots = spotsArr.map(element => element.dataValues);
    spots.avgRating = avgRating;


  results.Spots = spots;
  results.page = page;
  results.size = size;
  res.status(200).json(results);
});

    // let avgRating = sequelize.fn('AVG', sequelize.col('Reviews.stars'));

    // const spots = await Spot.findAll({
    //   group: ['Spot.Id'],
    //   include: [{
    //     model: Review,
    //     attributes: []
    //   }],
    //   attributes: [
    //     'id',
    //     'ownerId',
    //     'address',
    //     'city',
    //     'state',
    //     'country',
    //     'lat',
    //     'lng',
    //     'name',
    //     'description',
    //     'price',
    //     'createdAt',
    //     'updatedAt',
    //     [avgRating, 'avgRating']
    //   ]
    // });

    // return res.status(200).json(spots)


//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    });

    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      const spotId = spot.id;
      const previewImage = await SpotImage.findOne({
        where: {
          spotId: spotId,
          preview: true
        }
      });

      if (previewImage) {
        spot.dataValues.previewImage = previewImage.url;
      }
    }

    return res.status(200).json({Spots: spots})
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Review,
        attributes: []
      }
    ],
    attributes: {
      include: [
        [
          sequelize.fn("COUNT", sequelize.col("Reviews.id")),
          "numReviews"
        ],
        [
          sequelize.fn("AVG", sequelize.col("Reviews.stars")),
          "avgStarRating"
        ]
      ]
    },
    group: ['Spot.id', 'Owner.id', 'SpotImages.id']
  });

    if (!spot) {
        return res.status(404).json({
        message: "Spot couldn't be found"
        })
    }

    return res.status(200).json(spot);
});


//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    return res.status(404).json({
    "message": "Spot couldn't be found"
  })
}

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [{
      model: ReviewImage,
      attributes: ['id', 'url']
    },
    {
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    }
  ]
  })

  return res.status(200).json({Reviews: reviews})
})

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { user } = req
  if (!spot) {
    res.status(404).json({
      "message": "Spot couldn't be found"
    })
  }

  if (user.id !== spot.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']

    })
    return res.status(200).json(bookings)
  } else {
    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    })
    return res.status(200).json({Bookings: bookings})
  }

})


//CREATE A SPOT
router.post('/', requireAuth, validateSpot, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price  } = req.body
    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price

    });

    return res.status(201).json(spot)
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const {url, preview} = req.body;
  const spot = await Spot.findByPk(req.params.spotId)
if(!req.params.spotId) res.status(404).json({message: "Spot couldn't be found"})

if(req.user.id === spot.id) {
  const image = await SpotImage.create({
    url,
    preview,
    spotId: req.params.spotId
  })

  const imgRes = await SpotImage.findOne({
    where: {
      id: image.id
    },
    attributes: ['id', 'url', 'preview']
  })

return res.status(200).json(imgRes)

} else {
  return res.status(403).json({
    message: "Unauthorized"
});
}
})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId)
  const bookings = await Booking.findAll({
    where: {
      spotId: spot.id
    }
  })

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    })
  }

  if (user.id !== spot.ownerId) {
    if (endDate <= startDate) {
      return res.status(400).json({
        message: "Bad Request", // (or "Validation error" if generated by Sequelize),
        errors: {
          endDate: "endDate cannot be on or before startDate"
        }
      })
    }

    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      const start = booking.startDate;
      const end = booking.endDate;

      if (startDate >= start && startDate <= end) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking"
          }
        })
      } else if (endDate >= start && endDate <= end) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            endDate: "End date conflicts with an existing booking"
          }
        })
      }
    }

    const booking = await Booking.create({
      spotId: spot.id,
      userId: user.id,
      startDate,
      endDate
    })

    return res.status(200).json(booking)

  } else {
    return res.status(403).json({
      message: "Spot must NOT belong to the current user"
  });
  }

})

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const { review, stars } = req.body;
  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    return res.status(404).json({
    message: "Spot couldn't be found"
  })
}

  const newReview = await Review.create({
    userId: user.id,
    spotId: req.params.spotId,
    review,
    stars
  })

  return res.status(201).json(newReview)

})

//Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    })
  }
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  if (req.user.id === spot.id) {
    if (address) {
      spot.address = address;
    }
    if (city) {
      spot.city = city;
    }
    if (state) {
      spot.state = state;
    }
    if (country) {
      spot.country = country;
    }
    if (lat) {
      spot.lat = lat;
    }
    if (lng) {
      spot.lng = lng;
    }
    if (name) {
      spot.name = name;
    }
    if (description) {
      spot.description = description;
    }
    if (price) {
      spot.price = price;
    }

    await spot.save();

    return res.status(200).json(spot)

  } else {
    return res.status(403).json({
      message: "Unauthorized"
  });
  }

});

//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    })
  }
 console.log(spot)
  if (req.user.id === spot.ownerId) {
    await spot.destroy();
    return res.status(200).json({
      message: "Successfully deleted"
    })
  } else {
    return res.status(403).json({
        message: "Unauthorized to delete this review"
    });
}
})

module.exports = router;
