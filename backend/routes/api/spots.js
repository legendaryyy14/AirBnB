const express = require('express');
const { Op, fn, col} = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth} = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
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
    const spotsArr = await Spot.findAll();
    const spots = spotsArr.map(element => element.dataValues);

    return res.status(200).json({Spots: spots})
})

//Get all Spots owned by the Current User
router.get('/current', async (req, res) => {
    const { user } = req;
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

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
        model: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Review,
        attributes: ['id', 'spotId']
      }
    ],
    attributes: {
      include: [
        [
          fn("COUNT", col("Reviews.id")),
          "numReviews"
        ],
        [
          fn("AVG", col("Reviews.stars")),
          "avgStarRating"
        ]
      ]
    },
    group: ['Spot.id', 'Owner.id']
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
    }]
  })

  res.status(200).json(reviews)
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
if(!req.params.spotId) res.status(404).json({message: "Spot couldn't be found"})

  const image = await SpotImage.create({
    url,
    preview,
    spotId: req.params.spotId
  })

return res.status(200).json(image)
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

});

//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
console.log("here:", spot)
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    })
  } else {
    await spot.destroy();
  }

  return res.status(200).json(spot)
})

module.exports = router;
