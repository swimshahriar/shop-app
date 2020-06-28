const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/users-model');

// Signup User
const signUpUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
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
  });

  try {
    await createdUser.save();
    res.json({ user: createdUser });
  } catch (error) {
    const err = new Error(error.message);

    return next(err);
  }
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

  res.json({
    message: 'Loged In',
    user: existingUser,
  });
};

exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
