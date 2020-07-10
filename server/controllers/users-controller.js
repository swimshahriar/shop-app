const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/users-model');

// Signup User
const signUpUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error('Email already in use!');
      return next(err);
    }
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  let hashedPass;

  try {
    hashedPass = await bcrypt.hash(password, 10);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPass,
    orders: [],
    products: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    const err = new Error(error.message);

    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json({
    userId: createdUser.id,
    token: token,
  });
};

// Login User
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!existingUser) {
    const err = new Error('Email not found!');
    return next(err);
  }

  let isValidPass = false;

  try {
    isValidPass = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!isValidPass) {
    const err = new Error('Invalid Password!');

    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json({
    userId: existingUser.id,
    token: token,
  });
};

exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
