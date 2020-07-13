const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Product = require('../models/products-model');
const User = require('../models/users-model');

// Get all the Products
const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!products) {
    const error = new Error('No products found!');
    return next(error);
  }

  res.json(products);
};

// Get Products By Id
const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  let products;
  try {
    products = await Product.findById(productId);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!products) {
    const error = new Error('No products found!');
    return next(error);
  }

  res.json(products);
};

// Get Products By User Id
const getProductsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let products;
  try {
    products = await Product.find({ userId });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!products) {
    const error = new Error('No products found!');
    return next(error);
  }

  res.json(products);
};

// Add a Product
const addProduct = async (req, res, next) => {
  const { name, description, price, imageURL, userId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!user) {
    const err = new Error('User not found!');
    return next(err);
  }

  const createdProduct = new Product({
    name,
    description,
    price,
    imageURL,
    userId,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdProduct.save({ session });
    user.products.push(createdProduct);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json({ message: 'Product added successfully!', product: createdProduct });
};

// Edit a Product
const editProduct = async (req, res, next) => {
  const pid = req.params.pid;
  const { description, price } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  let existingProduct;
  try {
    existingProduct = await Product.findById(pid);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!existingProduct) {
    const error = new Error('No Product Found!');
    return next(error);
  }

  existingProduct.description = description;
  existingProduct.price = price;

  try {
    await existingProduct.save();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json({
    message: 'Product edited successfully!',
    editedProduct: existingProduct,
  });
};

// Delete a Product
const deleteProduct = async (req, res, next) => {
  const pid = req.params.pid;

  let product;
  try {
    product = await Product.findById(pid).populate('userId');
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!product) {
    const error = new Error('No product found!');
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await product.remove({ session });
    product.userId.products.pull(product);
    await product.userId.save({ session });
    await session.commitTransaction();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json({ message: 'Product Deleted!' });
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.addProduct = addProduct;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
