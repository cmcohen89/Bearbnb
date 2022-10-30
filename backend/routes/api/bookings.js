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
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 });
    }

    const userBookings = await Booking.findAll({
      where: {
        userId: user.id
      },
      include: [
        {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        }
      ],
      // group: ['Booking.id']
    })

    const result = [];

    for (let booking of userBookings) {
      booking = booking.toJSON();

      let spotObj = booking.Spot;

      const img = await SpotImage.findOne({
        where: {
          spotId: spotObj.id,
          preview: true
        }
      })

      spotObj.previewImage = img.url;

      delete booking.Spot
      booking.Spot = spotObj;
      result.push(booking);
    }

    res.json({ 'Bookings': result })
  }
)

router.put(
  '/:bookingId',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 });
    }

    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found", statusCode: 404 })
    }
    if (booking.userId != user.id) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    const { startDate, endDate } = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (endDateObj < startDateObj) {
      return res.status(400).json({
        message: 'Validation error',
        statusCode: 400,
        errors: {
          endDate: 'endDate cannot come before startDate'
        }
      })
    }

    const today = Date.now();
    if (endDateObj < today) {
      return res.status(403).json({ message: "Past bookings can't be modified", statusCode: 403 })
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
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 });
    }

    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found", statusCode: 404 })
    }

    const spot = await Spot.findByPk(booking.spotId)
    if (booking.userId != user.id && spot.ownerId != user.id) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    const today = Date.now()
    const startDateObj = new Date(booking.startDate);
    if (startDateObj < today) {
      res.status(403).json({
        message: "Bookings that have been started can't be deleted",
        statusCode: 403
      })
    }

    await booking.destroy()

    return res.json({ message: "Successfully deleted", statusCode: 200 })
  }
)


module.exports = router;
