const express = require('express')

const Sequelize = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { validationResult } = require('express-validator');

const router = express.Router();

// Get all of the Current User's Bookings
router.get(
  '/current',
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["Must be logged in to access your bookings!"];
      return next(err);
    }

    const userBookings = await Booking.findAll({
      where: {
        userId: user.id
      },
      include: [
        {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
          include: [
            {
              model: SpotImage,
              where: {
                preview: true
              },
              attributes: ['url']
            }
          ]
        }
      ]
    })

    const result = [];

    for (let booking of userBookings) {
      booking = booking.toJSON();

      booking.Spot.previewImage = booking.Spot.SpotImages[0].url;
      delete booking.Spot.SpotImages;

      result.push(booking);
    }

    res.json({ 'Bookings': result })
  }
)

// Edit a Booking
router.put(
  '/:bookingId',
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["Must be logged in to update a booking!"];
      return next(err);
    }
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
      const err = new Error('Booking could not be found');
      err.status = 404;
      err.title = 'Booking could not be found';
      err.errors = ["Booking couldn't be found"];
      return next(err);
    }

    if (booking.userId != user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You are not the owner of this booking!"];
      return next(err);
    }

    const { startDate, endDate } = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (endDateObj < startDateObj) {
      const err = new Error('Validation error');
      err.status = 400;
      err.title = 'Validation error';
      err.errors = ["End date cannot come before start date!"];
      return next(err);
      // return res.status(400).json({
      //   message: 'Validation error',
      //   statusCode: 400,
      //   errors: {
      //     endDate: 'endDate cannot come before startDate'
      //   }
      // })
    }

    const today = Date.now();
    if (endDateObj < today) {
      const err = new Error('Validation error');
      err.status = 403;
      err.title = 'Validation error';
      err.errors = ["Past bookings can't be modified"];
      return next(err);
      // return res.status(403).json({ message: "Past bookings can't be modified", statusCode: 403 })
    }

    const spot = await Spot.findOne({
      where: {
        id: booking.spotId
      }
    })

    const currentBookingDates = await Booking.findAll({
      where: {
        spotId: spot.id
      },
      attributes: ['startDate', 'endDate'],
      raw: true
    })

    const errors = {};
    for (let obj of currentBookingDates) {
      currentStartDate = new Date(obj.startDate);
      currentEndDate = new Date(obj.endDate);

      if (startDateObj >= currentStartDate && startDateObj <= currentEndDate) errors.startDate = "Start date conflicts with an existing booking";
      if (endDateObj >= currentStartDate && endDateObj <= currentEndDate) errors.endDate = "End date conflicts with an existing booking";
      if (startDateObj < currentStartDate && endDateObj > currentEndDate) errors.bookingConflict = "Chosen dates conflict with an existing booking";
    }

    if (Object.keys(errors).length) {
      const err = new Error('Validation error');
      err.status = 403;
      err.title = 'Validation error';
      err.errors = ["Sorry, this spot is already booked for the specified date"];
      return next(err);
      // return res.status(403).json({
      //   message: "Sorry, this spot is already booked for the specified dates",
      //   statusCode: 403,
      //   errors
      // })
    }

    booking.set({
      startDate,
      endDate
    })

    await booking.save()

    res.json(booking)
  }
)

router.delete(
  '/:bookingId',
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["Must be logged in to delete a booking!"];
      return next(err);
    }

    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
      const err = new Error('Booking could not be found');
      err.status = 404;
      err.title = 'Booking could not be found';
      err.errors = ["Booking couldn't be found"];
      return next(err);
    }

    const spot = await Spot.findByPk(booking.spotId)
    if (booking.userId != user.id && spot.ownerId != user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You are not the owner of this booking!"];
      return next(err);
    }

    const today = Date.now()
    const startDateObj = new Date(booking.startDate);
    if (startDateObj < today) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["Bookings that have been started can't be deleted"];
      return next(err);
      // res.status(403).json({
      //   message: "Bookings that have been started can't be deleted",
      //   statusCode: 403
      // })
    }

    await booking.destroy()

    return res.json({ message: "Successfully deleted", statusCode: 200 })
  }
)


module.exports = router;
