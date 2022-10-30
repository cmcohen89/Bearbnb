const express = require('express')

const Sequelize = require('sequelize');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { validationResult } = require('express-validator');

const router = express.Router();

const validateReviewBody = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5'),
  // handleValidationErrors
];

// Get all Reviews of Current User
router.get(
  '/current',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    let reviews = await Review.findAll({
      where: {
        userId: user.id
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ],
      // group: ['Review.id']
    })

    const result = [];

    for (let review of reviews) {
      review = review.toJSON()

      let spotObj = review.Spot;

      const img = await SpotImage.findOne({
        where: {
          spotId: spotObj.id,
          preview: true
        }
      });

      spotObj.previewImage = img.url;

      delete review.Spot;
      review.Spot = spotObj;
      result.push(review);
    }

    res.json({ 'Reviews': result });
  }
)

// Add an image to a Review based on the Review's id
router.post(
  '/:reviewId/images',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found", statusCode: 404 })
    }
    if (user.id != review.userId) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    const currImgNum = await ReviewImage.findOne({
      where: {
        reviewId: req.params.reviewId
      },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('ReviewImage.id')), 'numImgs']
      ],
      raw: true
    })

    if (currImgNum.numImgs >= 10) {
      return res.status(403).json({ message: "Maximum number of images for this resource was reached", statusCode: 403 })
    }

    const { url } = req.body;

    let newImg = await ReviewImage.create({
      reviewId: review.id,
      url
    })

    newImg = newImg.toJSON()
    delete newImg.reviewId
    delete newImg.createdAt
    delete newImg.updatedAt

    res.json(newImg)
  }
)

// Edit a Review
router.put(
  '/:reviewId',
  restoreUser,
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
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const currReview = await Review.findByPk(req.params.reviewId);
    if (!currReview) {
      return res.status(404).json({ message: "Review couldn't be found", statusCode: 404 })
    }
    if (user.id != currReview.userId) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    const { review, stars } = req.body;

    currReview.set({
      review,
      stars
    })

    res.json(currReview)
  }
)

// Delete a Review
router.delete(
  '/:reviewId',
  restoreUser,
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required', statusCode: 401 })
    }

    const currReview = await Review.findByPk(req.params.reviewId);
    if (!currReview) {
      return res.status(404).json({ message: "Review couldn't be found", statusCode: 404 })
    }
    if (user.id != currReview.userId) {
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    await currReview.destroy();

    return res.json({ message: "Successfully deleted", statusCode: 200 })
  }
)


module.exports = router;
