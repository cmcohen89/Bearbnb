const express = require('express')

const Sequelize = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
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
  handleValidationErrors
];

const validateReviewBody = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// Get spots owned by current user
router.get(
  '/current',
  async (req, res, next) => {
    const { user } = req;
    if (!user) return res.status(401).json({ message: 'Authentication required', statusCode: 401 })

    const userSpots = await Spot.findAll({
      where: {
        ownerId: user.id
      },
      include: [
        {
          model: Review,
          attributes: ['stars']
        },
        {
          model: SpotImage,
          where: { preview: true },
          required: false,
          attributes: ['url']
        }
      ]
    });

    const result = [];

    for (let spot of userSpots) {
      spot = spot.toJSON();

      let sum = 0;
      for (let review of spot.Reviews) sum += review.stars;
      const avg = (sum / spot.Reviews.length).toFixed(2);
      avg ? spot.avgRating = avg : spot.avgRating = "No reviews for this spot!";
      delete spot.Reviews;

      if (spot.SpotImages.length) {
        const imgUrl = spot.SpotImages[0].url;
        spot.previewImage = imgUrl;
        delete spot.SpotImages;
      }

      result.push(spot);
    }

    return res.json({ 'Spots': result });
  }
)

// Get all Reviews by a Spot's id
router.get(
  '/:spotId/reviews',
  async (req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)
    if (!spot) return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })

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
  async (req, res, next) => {
    const { user } = req;

    const spot = await Spot.findOne({
      where: {
        id: req.params.spotId
      }
    })

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })

    if (spot.ownerId != user.id) {
      const bookings = await Booking.findAll({
        where: {
          spotId: spot.id
        },
        attributes: ['spotId', 'startDate', 'endDate']
      })

      res.json({ Bookings: bookings });

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

      res.json({ Bookings: bookings });
    }
  }
)

// Get spot by id
router.get(
  '/:spotId',
  async (req, res, next) => {
    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: Review,
          attributes: ['stars']
        }
      ]
    });

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });

    spot = spot.toJSON();

    spot.Owner = spot.User;
    delete spot.User;

    spot.numReviews = spot.Reviews.length;

    let sum = 0;
    for (let review of spot.Reviews) sum += review.stars;
    const avg = (sum / spot.Reviews.length).toFixed(2);
    avg ? spot.avgStarRating = avg : spot.avgStarRating = "No reviews for this spot!"
    delete spot.Reviews;

    return res.json(spot);
  }
)

// Get all spots
router.get(
  '/',
  async (req, res, next) => {
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const pagination = {};
    const errors = {};
    const where = {};

    page = parseInt(page);
    size = parseInt(size);

    if (req.query.page && (!Number.isInteger(page) || page < 1)) errors.page = "Page must be greater than or equal to 1";
    if (req.query.size && (!Number.isInteger(size) || size < 1)) errors.size = "Size must be greater than or equal to 1";
    if (minLat) !Number.isInteger(minLat) ? errors.minLat = "Minimum latitude is invalid" : where.latitude = { [Op.gte]: minLat };
    if (maxLat) !Number.isInteger(maxLat) ? errors.maxLat = "Maximum latitude is invalid" : where.latitude = { [Op.lte]: maxLat };
    if (minLng) !Number.isInteger(minLng) ? errors.minLng = "Minimum longitude is invalid" : where.longitude = { [Op.gte]: minLng };
    if (maxLng) !Number.isInteger(maxLng) ? errors.maxLng = "Maximum longitude is invalid" : where.longitude = { [Op.gte]: maxLng };
    if (minPrice) minPrice < 0 ? errors.minPrice = "Minimum price must be greater than or equal to 0" : where.price = { [Op.gte]: minPrice };
    if (maxPrice) maxPrice < 0 ? errors.maxPrice = "Maximum price must be greater than or equal to 0" : where.price = { [Op.lte]: maxPrice };

    if (Object.keys(errors).length) {
      return res.status(400).json({
        message: "Validation Error",
        statusCode: 400,
        errors
      })
    }

    if (page > 10) page = 10;
    if (size > 20) size = 20;

    if (page) pagination.limit = size;
    if (size) pagination.offset = size * (page - 1);

    const allSpots = await Spot.findAll({
      where,
      ...pagination,
      include: [
        {
          model: SpotImage,
          where: {
            preview: true
          },
          required: false,
          attributes: ['url']
        },
        {
          model: Review,
          attributes: ['stars']
        }
      ]
    });

    const result = [];

    for (let spot of allSpots) {
      spot = spot.toJSON()

      if (spot.SpotImages.length) {
        spot.previewImage = spot.SpotImages[0].url;
        delete spot.SpotImages
      }

      let sum = 0;
      for (let review of spot.Reviews) sum += review.stars;
      spot.Reviews.length ? spot.avgRating = (sum / spot.Reviews.length).toFixed(2) : spot.avgRating = 'New';
      delete spot.Reviews;

      result.push(spot);
    }

    const finalResult = { 'Spots': result, page, size };

    if (!page) delete finalResult.page
    if (!size) delete finalResult.size

    return res.json(finalResult);
  }
)

// Create a Review for a Spot based on the Spot's id
router.post(
  '/:spotId/reviews',
  validateReviewBody,
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
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["Must be logged in to leave a review!"];
      return next(err);
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      const err = new Error('Spot could not be found');
      err.status = 404;
      err.title = 'Spot could not be found';
      err.errors = ["Spot couldn't be found"];
      return next(err);
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
        const err = new Error('Duplicate review');
        err.status = 403;
        err.title = 'Duplicate review';
        err.errors = ["You've already left a review for this spot!"];
        return next(err);
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
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["Must be logged in to add an image!"];
      return next(err);
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      const err = new Error('Spot could not be found');
      err.status = 404;
      err.title = 'Spot could not be found';
      err.errors = ["Spot couldn't be found"];
      return next(err);
    }

    if (spot.ownerId != user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You are not the owner of this spot!"];
      return next(err);
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
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["Must be logged in to create a booking!"];
      return next(err);
    }

    const { startDate, endDate } = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (endDateObj <= startDateObj) {
      const err = new Error('Validation error');
      err.status = 400;
      err.title = 'Validation error';
      err.errors = ["endDate cannot be on or before startDate"];
      return next(err);
      // return res.status(400).json({
      //   message: 'Validation error',
      //   statusCode: 400,
      //   errors: {
      //     endDate: 'endDate cannot be on or before startDate'
      //   }
      // })
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      const err = new Error('Spot could not be found');
      err.status = 404;
      err.title = 'Spot could not be found';
      err.errors = ["Spot couldn't be found"];
      return next(err);
    }

    if (spot.ownerId == user.id) {
      const err = new Error('Cannot book own spot');
      err.status = 400;
      err.title = 'Cannot book own spot';
      err.errors = ["You cannot book your own spot!"];
      return next(err);
      // return res.status(400).json({
      //   message: "You cannot book your own spot!",
      //   statusCode: 400
      // })
    }

    const currentBookingDates = await Booking.findAll({
      where: {
        spotId: spot.id
      },
      attributes: ['startDate', 'endDate'],
      raw: true
    })

    const errors = {};
    for (let obj of currentBookingDates) {
      currentStartDateObj = new Date(obj.startDate);
      currentEndDateObj = new Date(obj.endDate);

      if (startDateObj >= currentStartDateObj && startDateObj <= currentEndDateObj) errors.startDate = "Start date conflicts with an existing booking";
      if (endDateObj >= currentStartDateObj && endDateObj <= currentEndDateObj) errors.endDate = "End date conflicts with an existing booking";
      if (startDateObj < currentStartDateObj && endDateObj > currentEndDateObj) errors.bookingConflict = "Chosen dates conflict with an existing booking";
    }

    if (Object.keys(errors).length) {
      const err = new Error('Spot booked');
      err.status = 403;
      err.title = 'Spot booked';
      err.errors = ["Sorry, this spot is already booked for the specified dates"];
      return next(err);
      // return res.status(403).json({
      //   message: "Sorry, this spot is already booked for the specified dates",
      //   statusCode: 403,
      //   errors
      // })
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
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["You must be logged in to create a spot!"];
      return next(err);
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
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["You must be logged in to update a spot!"];
      return next(err);
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      const err = new Error('Spot could not be found');
      err.status = 404;
      err.title = 'Spot could not be found';
      err.errors = ["Spot couldn't be found"];
      return next(err);
    }

    if (spot.ownerId != user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You do not own this spot!"];
      return next(err);
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
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["You must be logged in to delete a spot!"];
      return next(err);
    }

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      const err = new Error('Spot could not be found');
      err.status = 404;
      err.title = 'Spot could not be found';
      err.errors = ["Spot couldn't be found"];
      return next(err);
    }

    if (spot.ownerId != user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You do not own this spot!"];
      return next(err);
    }

    await spot.destroy()

    return res.json({ message: "Successfully deleted", statusCode: 200 })
  }
)

module.exports = router;
