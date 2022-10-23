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
    const userSpots = await Spot.findAll({
      where: {
        id: user.id
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
      }
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

module.exports = router;
