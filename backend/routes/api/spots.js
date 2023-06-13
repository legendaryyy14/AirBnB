const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth} = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
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


router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    return res.status(200).json({spots})
})

router.get('/current', async (req, res) => {
    const { user } = req;
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    return res.status(200).json(spots)
})

router.get('/:spotId', async (req, res) => {
    const spot = Spot.findByPk(req.params.spotId, {
        include: [SpotImage]
    });

    if (!spot) {
        return res.status(404).json({
        message: "Spot couldn't be found"
        })
    }

    return res.status(200).json(spot)
})

//CREATE A SPOT
router.post('/', requireAuth, validateSpot, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price  } = req.body
    const ownerId = req.user.dataValues.id
    const newSpot = {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    }

    return res.json(newSpot)
})


module.exports = router;
