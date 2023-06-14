const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

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
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }
      ]
    })
    return res.status(200).json({Reviews: reviews})
  })





 module.exports = router;
