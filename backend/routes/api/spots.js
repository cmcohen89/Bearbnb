const express = require('express')

const Sequelize = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { validationResult } = require('express-validator');

const router = express.Router();

const validateSpotBody = [
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
  // handleValidationErrors
];

const validateReviewBody = [
  check('review')
    .exists({ checkFalsy: true})
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5'),
  // handleValidationErrors
];

// Get spots owned by current user
router.get(
  '/current',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
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

    return res.json({ 'Spots': userSpots });
  }
)

// Get all Reviews by a Spot's id
router.get(
  '/:spotId/reviews',
  async (req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    const reviews = await Review.findAll({
      where: {
        spotId
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ]
    })

    res.json({ Reviews: reviews })
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
      },
      attributes: ['id', 'url', 'preview']
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
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
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
          [Sequelize.col('SpotImages.url'), 'previewImage']
        ]
      },
      group: ['Spot.id']
    });

    return res.json({ 'Spots': allSpots });
  }
)

// Create a Review for a Spot based on the Spot's id
router.post(
  '/:spotId/reviews',
  validateReviewBody,
  restoreUser,
  async (req, res, next) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: result.mapped()
      });
    }

    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    const spotReviews = await Review.findAll({
      where: {
        spotId: req.params.spotId
      },
      attributes: ['userId'],
      raw: true
    })

    for (let review of spotReviews) {
      if (review.userId == user.id) {
        return res.status(403).json({message: 'User already has a review for this spot', statusCode: 403})
      }
    }

    const { review, stars } = req.body;

    const newReview = await Review.create({
      userId: user.id,
      spotId: spot.id,
      review,
      stars
    })

    res.json(newReview)
  }
)

// Add an image to a Spot based on the Spot's id
router.post(
  '/:spotId/images',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId != user.id) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
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
  validateSpotBody,
  restoreUser,
  async (req, res, next) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: result.mapped()
      });
    }

    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

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
  validateSpotBody,
  restoreUser,
  async (req, res, next) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.json({
        message: "Validation Error",
        statusCode: 400,
        errors: result.mapped()
      });
    }

    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId != user.id) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

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
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId != user.id) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    await spot.destroy()

    return res.json({ message: "Successfully deleted", statusCode: 200 })
  }
)

module.exports = router;
