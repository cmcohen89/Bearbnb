const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    // .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  // handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
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

    let usernames = await User.findAll({
      attributes: ['username'],
      raw: true
    })

    let emails = await User.findAll({
      attributes: ['email'],
      raw: true
    })

    for (let obj of usernames) {
      if (req.body.username == obj.username) {
        return res.status(403).json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            username: "User with that username already exists"
          }
        })
      }
    }

    for (let obj of emails) {
      if (req.body.email == obj.email) {
        return res.status(403).json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            email: "User with that email already exists"
          }
        })
      }
    }


    const { firstName, lastName, email, username, password } = req.body;
    let user = await User.signup({ firstName, lastName, email, username, password });

    const token = await setTokenCookie(res, user);

    user = user.toJSON()
    delete user.createdAt;
    delete user.updatedAt;
    user.token = token;

    return res.json({ user });
  }
);

module.exports = router;
