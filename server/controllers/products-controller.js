const { validationResult } = require('express-validator');

const Product = require('../models/products-model');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.json({ products: products });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
};

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

const editProduct = async (req, res, next) => {
  const productId = req.params.pid;
  const { description, price } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error(errors.array());
  }

  let existingProduct;
  try {
    existingProduct = await Product.findOne({
      _id: ObjectId(productId),
    });
    res.json({
      editedProduct: existingProduct,
    });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!existingProduct) {
    throw new Error('No Product Found!');
  }

  existingProduct.description = description;
  existingProduct.price = price;

  try {
    await existingProduct.save();
    res.json({ editedProduct: existingProduct });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
};

const deleteProduct = (req, res, next) => {};

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
