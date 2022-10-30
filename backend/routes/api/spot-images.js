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
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 });
    }

    const img = await SpotImage.findByPk(req.params.imageId);
    if (!img) {
      return res.status(404).json({ message: "Spot Image couldn't be found", statusCode: 404 })
    }

    const spot = await Spot.findByPk(img.spotId)
    if (spot.ownerId != user.id) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    await img.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
)




module.exports = router;
