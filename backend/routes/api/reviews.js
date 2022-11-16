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
  handleValidationErrors
];

// Get all Reviews of Current User
router.get(
  '/current',
  async (req, res, next) => {
    const { user } = req;
    if (!user) return res.status(401).json({ message: 'Authentication required', statusCode: 401 })

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
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        },
      ]
    })

    const result = [];

    for (let review of reviews) {
      review = review.toJSON()

      review.Spot.previewImage = review.Spot.SpotImages[0].url;
      delete review.Spot.SpotImages;

      result.push(review);
    }

    res.json({ 'Reviews': result });
  }
)

// Add an image to a Review based on the Review's id
router.post(
  '/:reviewId/images',
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["Must be logged in to add an image!"];
      return next(err);
    }

    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      const err = new Error('Review could not be found');
      err.status = 404;
      err.title = 'Review could not be found';
      err.errors = ["Review couldn't be found"];
      return next(err);
    }

    if (user.id != review.userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You are not the owner of this review!"];
      return next(err);
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

    if (currImgNum.numImgs >= 10) return res.status(403).json({ message: "Maximum number of images for this resource was reached", statusCode: 403 });

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
      err.errors = ["Must be logged in to edit a review!"];
      return next(err);
    }

    const currReview = await Review.findByPk(req.params.reviewId);
    if (!currReview) {
      const err = new Error('Review could not be found');
      err.status = 404;
      err.title = 'Review could not be found';
      err.errors = ["Review couldn't be found"];
      return next(err);
    }

    if (user.id != currReview.userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You are not the owner of this review!"];
      return next(err);
    }

    const { review, stars } = req.body;

    currReview.set({
      review,
      stars
    })

    await currReview.save()

    res.json(currReview)
  }
)

// Delete a Review
router.delete(
  '/:reviewId',
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Must be logged in';
      err.errors = ["Must be logged in to delete a review!"];
      return next(err);
    }

    const currReview = await Review.findByPk(req.params.reviewId);
    if (!currReview) {
      const err = new Error('Review could not be found');
      err.status = 404;
      err.title = 'Review could not be found';
      err.errors = ["Review couldn't be found"];
      return next(err);
    }

    if (user.id != currReview.userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      err.title = 'Forbidden';
      err.errors = ["You are not the owner of this review!"];
      return next(err);
    }

    await currReview.destroy();

    return res.json({ message: "Successfully deleted", statusCode: 200 })
  }
)


module.exports = router;
