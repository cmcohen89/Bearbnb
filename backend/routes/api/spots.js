const express = require('express')

const Sequelize = require('sequelize');
const { Spot, User, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');

const router = express.Router();

const validateBody = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .isNumeric()
    .withMessage('Latitude is not valid'),
  check('lng')
    .isNumeric()
    .withMessage('Longitude is not valid'),
  check('name')
    .isLength({ max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

// Get spots owned by current user
router.get(
  '/current',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      res.status(401).json({message: 'Authentication required', statusCode: 401})
    }

    const userSpots = await Spot.findAll({
      where: {
        ownerId: user.id
      },
      include: [
        {
          model: SpotImage,
          where: {
            preview: true
          },
          attributes: []
        },
        {
          model: Review,
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
          [Sequelize.col('url'), 'previewImage']
        ]
      },
      group: ["Spot.id"]
    });

    return res.json({'Spots': userSpots});
  }
)

// Get spot by id
router.get(
  '/:spotId',
  async (req, res, next) => {
    const { spotId } = req.params;

    let images = await SpotImage.findAll({
      where: {
        spotId
      }
    })

    let spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Review,
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
          [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"]
        ]
      }
    });

    if (!spot.id) {
      return res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }

    spot = spot.toJSON()
    const ownerObj = spot.User
    delete spot.User
    spot.SpotImages = images
    spot.Owner = ownerObj

    return res.json(spot);
  }
)

// Get all spots
router.get(
  '/',
  async (req, res, next) => {
    const allSpots = await Spot.findAll({
      include: [
        {
          model: SpotImage,
          where: {
            preview: true
          },
          attributes: []
        },
        {
          model: Review,
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
          [Sequelize.col('url'), 'previewImage']
        ]
      },
      group: ['Spot.id']
    });

    return res.json({'Spots': allSpots});
  }
)

// Add an image to a Spot based on the Spot's id
router.post(
  '/:spotId/images',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      res.status(401).json({message: 'Authentication required', statusCode: 401})
    }

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }

    if (spot.ownerId != user.id) {
      res.status(403).json({message: "Forbidden", statusCode: 403});
    }

    const { url, preview } = req.body;

    let newSpotImg = await SpotImage.create({
      spotId: +req.params.spotId,
      url,
      preview
    })

    newSpotImg = newSpotImg.toJSON()
    delete newSpotImg.spotId
    delete newSpotImg.createdAt
    delete newSpotImg.updatedAt

    res.json(newSpotImg)
  }
)

// Create a Spot
router.post(
  '/',
  validateBody,
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      res.status(401).json({message: 'Authentication required', statusCode: 401})
    }

    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const newSpot = await Spot.create({
      ownerId: user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })

    res.json(newSpot);
  }
)

// Edit a Spot
router.put(
  '/:spotId',
  validateBody,
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      res.status(401).json({message: 'Authentication required', statusCode: 401})
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }

    if (spot.ownerId != user.id) {
      res.status(403).json({message: "Forbidden", statusCode: 403});
    }

    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    spot.set({
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

    await spot.save();

    res.json(spot)
  }
)

// Delete a Spot
router.delete(
  '/:spotId',
  restoreUser,
  async (req, res, next) => {
    const {user} = req;
    if (!user) {
      res.status(401).json({message: 'Authentication required', statusCode: 401})
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }

    if (spot.ownerId != user.id) {
      return res.status(403).json({message: "Forbidden", statusCode: 403});
    }

    await spot.destroy()

    return res.json({message: "Successfully deleted", statusCode: 200})
  }
)

module.exports = router;
