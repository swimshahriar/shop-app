const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const usersController = require('../controllers/users-controller');

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  usersController.loginUser
);

router.post(
  '/signup',
  [
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  usersController.signUpUser
);

module.exports = router;
