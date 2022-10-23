const express = require('express')

const Sequelize = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');

const router = express.Router();

const validateBody = [
  check('review')
    .exists({ checkFalsy: true})
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// Get all Reviews of Current User
router.get(
  '/current',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      res.status(401).json({message: 'Authentication required', statusCode: 401})
    }
  }
)





module.exports = router;
