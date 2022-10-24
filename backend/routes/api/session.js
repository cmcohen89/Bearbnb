const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    // .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  // handleValidationErrors
];

// Log in
router.post(
  '/',
  validateLogin,
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
    const { credential, password } = req.body;

    let user = await User.login({ credential, password });

    if (!user) {
      // const err = new Error('Login failed');
      // err.status = 401;
      // err.title = 'Login failed';
      // err.errors = ['The provided credentials were invalid.'];
      // return next(err);
      return res.status(401).json({message: 'Invalid credentials', statusCode: 401})
    }

    await setTokenCookie(res, user);

    user = user.toJSON()
    delete user.createdAt;
    delete user.updatedAt;
    user.token = ''
    console.log(user)

    return res.json(user);
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(
        user.toSafeObject()
      );
    } else return res.json({});
  }
);

module.exports = router;
