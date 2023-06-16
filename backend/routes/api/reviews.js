const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

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

//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const reviews = await Review.findAll({
      where: {
        userId: user.id
      },
      include: [
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            where: {
                ownerId: user.id
            },
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }
      ]
    })

    for (let i = 0; i < reviews.length; i++) {
        const el = reviews[i];
        const spotId = el.spotId;
        const previewImage = await SpotImage.findOne({
          where: {
            spotId: spotId,
            preview: true
          }
        });

        if (previewImage) {
          el.Spot.dataValues.previewImage = previewImage.url;
        }
      }
    return res.status(200).json({Reviews: reviews})
  })

//Add an Image to a Review based on the Review's id

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const { user } = req;
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
          })
    }

    const revImages = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if (revImages.length < 10) {
            const newImage = await ReviewImage.create({
        url,
        reviewId: review.id
    })
        return res.status(200).json({
            id: newImage.id,
            url: newImage.url
        })
    } else {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
          })
    }

})

router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const existingReview = await Review.findByPk(req.params.reviewId);
    const { review , stars } = req.body;

    if (!existingReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
          })
    }

    if (review) existingReview.review = review;
    if (stars) existingReview.stars = stars;

    await existingReview.save();

    return res.status(200).json(existingReview)

})

//Delete A Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    if(!review) {
        return res.status(404).json({
            "message": "Review couldn't be found"
          })
    }

    if(req.user.id === review.userId) {
        await review.destroy()
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
