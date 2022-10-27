const express = require('express')

const Sequelize = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

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
          model: Review,
        },
        {
          model: SpotImage,
          attributes: ['url'],
          where: {
            preview: true
          }
        }
      ],
    });

    const result = []

    for (let spot of userSpots) {

      spot = spot.toJSON();
      const imgUrl = spot.SpotImages[0].url;
      delete spot.SpotImages
      spot.previewImg = imgUrl;

      if (!spot.Reviews.length) {
        spot.avgRating = "No reviews for this spot!"
      } else {
        let sum = 0;
        for (let review of spot.Reviews) {
          sum += review.stars;
        }

        let avg = sum / spot.Reviews.length;

        spot.avgRating = avg;
      }

      delete spot.Reviews;

      result.push(spot);
    }
    return res.json({Spots: result})
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

// Get all Bookings for a Spot based on the Spot's id
router.get(
  '/:spotId/bookings',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;

    const spot = await Spot.findOne({
      where: {
        id: req.params.spotId
      }
    })

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId != user.id) {
      const bookings = await Booking.findAll({
        where: {
          spotId: spot.id
        },
        attributes: ['spotId', 'startDate', 'endDate']
      })

      res.json({Bookings: bookings});

    } else {
      const bookings = await Booking.findAll({
        where: {
          spotId: spot.id
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          }
        ]
      })

      res.json({Bookings: bookings});
    }
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
        }
      ]
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    const result = [];


    spot = spot.toJSON()
    const reviews = await Review.findAll({
      where: {
        spotId: spot.id
      },
      attributes: ['stars']
    })

    spot.numReviews = reviews.length;

    if (!reviews.length) {
      spot.avgStarRating = 'No reviews for this spot!'
    } else {
      let sum = 0;
      for (let obj of reviews) {
        sum += obj.stars;
      }

      spot.avgStarRating = sum / reviews.length;
    }
    result.push(spot);

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

    if (!Object.keys(req.query).length) {
      const allSpots = await Spot.findAll({
        include: [
          {
            model: Review
          },
          {
            model: SpotImage
          }
        ]
      });

      const result = [];

      for (let spot of allSpots) {
        spot = spot.toJSON();

        const img = spot.SpotImages[0].url
        spot.previewImg = img;
        delete spot.SpotImages;

        if (!spot.Reviews.length) {
          spot.avgRating = "No reviews for this spot!"
        } else {
          let sum = 0;
          for (let review of spot.Reviews) {
            sum += review.stars;
          }

          let avg = sum / spot.Reviews.length;

          spot.avgRating = avg;
        }

        delete spot.Reviews;

        result.push(spot)

      }

      return res.json({
        'Spots': result,
      });

    } else {

      let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;

      const pagination = {};

      page = parseInt(page);
      size = parseInt(size);

      if (!Number.isInteger(page) || page < 1) {
        res.status(400).json({
          message: "Validation Error",
          statusCode: 400,
          errors: {
            page: "Page must be greater than or equal to 1"
          }
        })
      }
      if (!Number.isInteger(size) || size < 1) {
        res.status(400).json({
          message: "Validation Error",
          statusCode: 400,
          errors: {
            page: "Size must be greater than or equal to 1"
          }
        })
      }

      if (page > 10) page = 10;
      if (size > 20) size = 20;

      pagination.limit = size;
      pagination.offset = size * (page - 1);

      const where = {};

      if (minLat) {

        if (!Number.isInteger(minLat)) {
          res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
              minLat: "Minimum latitude is invalid"
            }
          })
        }

        where.latitude = { [Op.gte]: minLat }
      }

      if (maxLat) {

        if (!Number.isInteger(maxLat)) {
          res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
              maxLat: "Maximum latitude is invalid"
            }
          })
        }

        where.latitude = { [Op.lte]: maxLat }
      }

      if (minLng) {

        if (!Number.isInteger(minLng)) {
          res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
              minLng: "Minimum longitude is invalid"
            }
          })
        }

        where.longitude = { [Op.gte]: minLng }
      }

      if (maxLng) {

        if (!Number.isInteger(maxLng)) {
          res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
              maxLng: "Maximum longitude is invalid"
            }
          })
        }

        where.longitude = { [Op.gte]: maxLng }
      }

      if (minPrice) {

        if (minPrice < 0) {
          res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
              minPrice: "Minimum price must be greater than or equal to 0"
            }
          })
        }

        where.price = { [Op.gte]: minPrice }
      }

      if (maxPrice) {

        if (maxPrice < 0) {
          res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
              maxPrice: "Maximum price must be greater than or equal to 0"
            }
          })
        }

        where.price = { [Op.lte]: maxPrice }
      }

      const allSpots = await Spot.findAll({
        where,
        ...pagination
      });

      const result = [];

      for (let spot of allSpots) {
        spot = spot.toJSON()

        const img = await SpotImage.findOne({
          where: {
            spotId: spot.id,
            preview: true
          }
        });

        spot.previewImage = img.url;

        result.push(spot);
      }

      return res.json({
        'Spots': result,
        page,
        size
      });
    }
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

    res.status(201).json(newReview)
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

// Create a Booking from a Spot based on the Spot's id
router.post(
  '/:spotId/bookings',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const { startDate, endDate } = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (endDateObj <= startDateObj) {
      return res.status(400).json({
        message: 'Validation error',
        statusCode: 400,
        errors: {
          endDate: 'endDate cannot be on or before startDate'
        }
      })
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
    }

    if (spot.ownerId == user.id) {
      return res.status(400).json({
        message: "You cannot book your own spot!",
        statusCode: 400
      })
    }

    const currentBookingDates = await Booking.findAll({
      where: {
        spotId: spot.id
      },
      attributes: ['startDate', 'endDate'],
      raw: true
    })

    for (let obj of currentBookingDates) {
      currentStartDateObj = new Date(obj.startDate);
      currentEndDateObj = new Date(obj.endDate);
      if (startDateObj >= currentStartDateObj && startDateObj <= currentEndDateObj) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            startDate: "Start date conflicts with an existing booking"
          }
        })
      } else if (endDateObj >= currentStartDateObj && endDateObj <= currentEndDateObj) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            endDate: "End date conflicts with an existing booking"
          }
        })
      } else if (startDateObj <= currentStartDateObj && endDateObj >= currentEndDateObj) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            endDate: "Chosen dates conflict with an existing booking"
          }
        })
      }
    }

    const newBooking = await Booking.create({
      spotId: spot.id,
      userId: user.id,
      startDate: startDate,
      endDate: endDate
    })

    res.json(newBooking)
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

    res.status(201).json(newSpot);
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
