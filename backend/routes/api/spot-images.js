const express = require('express')

const Sequelize = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { validationResult } = require('express-validator');

const router = express.Router();

router.delete(
  '/:imageId',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["You must be logged in to delete an image!"];
      return next(err);
    }

    const img = await SpotImage.findByPk(req.params.imageId);
    if (!img) {
      const err = new Error('Spot image could not be found');
      err.status = 404;
      err.title = 'Spot image could not be found';
      err.errors = ["Spot image couldn't be found"];
      return next(err);
    }

    const spot = await Spot.findByPk(img.spotId)
    if (spot.ownerId != user.id) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You are not the owner of this spot!"];
      return next(err);
    }

    await img.destroy()

    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
)




module.exports = router;
