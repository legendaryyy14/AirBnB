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

//Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
          })
    }

    if (req.user.id === booking.userId) {

      const bookingsWithSpotId = await Booking.findAll({
          where: {
              spotId: booking.spotId
          }
      })

      if (booking.endDate < Date.now()) {
          return res.status(403).json({
              message: "Past bookings can't be modified"
            })
      }

      if (endDate < startDate) {
          return res.status(400).json({
              message: "Bad Request", // (or "Validation error" if generated by Sequelize),
              errors: {
                endDate: "endDate cannot come before startDate"
              }
            })
      }

      for (let i = 0; i < bookingsWithSpotId.length; i++) {
          const booking = bookingsWithSpotId[i];
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

        booking.startDate = startDate;
        booking.endDate = endDate;

        await booking.save()

        return res.status(200).json(booking)

    } else {
          return res.status(403).json({
            message: "Unauthorized to edit this booking"
        });
    }

})

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
          })
    }

    if(Date() >= booking.startDate && Date() <= booking.endDate) {
        return res.json(403).json({
            message: "Bookings that have been started can't be deleted"
          })
    }

    if(req.user.id === booking.userId) {
        await booking.destroy()
        return res.status(200).json({
            message: "Successfully deleted"
          })
    } else {
        return res.status(403).json({
            message: "Unauthorized to delete this booking"
        });
    }
})

module.exports = router;
