const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking} = require('../../db/models');

const router = express.Router();


router.delete('/:reviewImageId', requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.reviewImageId);

    if (!reviewImage) {
        res.status(404).json({
            message: "Review Image couldn't be found"
          })
    };

    const review = await Review.findByPk(reviewImage.reviewId);
    const { user } = req;

    if (user.id === review.userId) {
        await reviewImage.destroy();
        return res.status(200).json({
            message: "Successfully deleted"
          })
    } else {
        return res.status(403).json({
            message: "Unauthorized to delete this review image"
        });
    }


})


module.exports = router;
