const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking} = require('../../db/models');

const router = express.Router();


router.delete('/:spotImageId', requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.spotImageId);

    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found"
          })
    }

    const spot = await Spot.findByPk(spotImage.spotId);
    const { user } = req;

    if (user.id === spot.ownerId) {
        await spotImage.destroy();
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
