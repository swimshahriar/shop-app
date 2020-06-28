const { validationResult } = require('express-validator');

const Product = require('../models/products-model');

// Get all the Products
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.json({ products: products });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
};

// Add a Product
const addProduct = async (req, res, next) => {
  const { name, description, price, imageURL } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  const createdProduct = new Product({
    name,
    description,
    price,
    imageURL,
  });

  try {
    const savedProduct = await createdProduct.save();
    res.json({ product: savedProduct });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
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
    const editedProduct = await existingProduct.save();
    res.json({ editedProduct: editedProduct });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
};

// Delete a Product
const deleteProduct = async (req, res, next) => {
  const pid = req.params.pid;

  let product;
  try {
    product = await Product.findById(pid);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!product) {
    const error = new Error('No product found!');
    return next(error);
  }

  try {
    await product.remove();

    res.json({ message: 'Product Deleted!' });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
};

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
