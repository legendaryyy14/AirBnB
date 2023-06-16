const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking} = require('../../db/models');

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                where: {
                    ownerId: user.id
                },
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']

            }
        ]
    })

    for (let i = 0; i < bookings.length; i++) {
        const el = bookings[i];
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

      res.status(200).json({ Bookings: bookings });
})


router.get('/')


module.exports = router;
