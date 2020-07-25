const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

const Order = require('../models/orders-model');
const User = require('../models/users-model');
const productsModel = require('../models/products-model');

// Get All the Orders
const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!orders) {
    res.json({ message: 'No orders Found!😭' });
  }
  res.json({ orders: orders });
};

// Make payment
const makePayment = () => {
  const { product, token } = req.body;
  const idempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.totalPrice * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.json(result))
    .catch((error) => {
      const err = new Error(error.message);
      return next(err);
    });
};

// Place an Order
const placeOrder = async (req, res, next) => {
  const { items, totalPrice, address, userId } = req.body;

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

  const createdOrder = new Order({
    items,
    totalPrice,
    address,
    userId,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdOrder.save({ session });
    user.orders.push(createdOrder);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
  res.json({ message: 'Order placed successfully', order: createdOrder });
};

// Change the Order status
const editOrderStatus = async (req, res, next) => {
  const { oid } = req.params;
  const { status } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  let existingOrder;
  try {
    existingOrder = await Order.findById(oid);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!existingOrder) {
    const error = new Error('No Orders Found!');
    return next(error);
  }

  if (existingOrder.status === status) {
    const err = new Error(
      'Already in a same status! Change it to something else.'
    );
    return next(err);
  }

  existingOrder.status = status;

  try {
    await existingOrder.save();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json({ message: 'Order Status changed!', updatedOrder: existingOrder });
};

// Delete an Order
const deleteOrder = async (req, res, next) => {
  const { oid } = req.params;
  const { userId } = req.body;

  let existingOrder;
  try {
    existingOrder = await Order.findById(oid).populate('userId');
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!existingOrder) {
    const error = new Error('No Orders Found!');
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await existingOrder.remove({ session });
    existingOrder.userId.orders.pull(existingOrder);
    await existingOrder.userId.save({ session });
    await session.commitTransaction();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json({ message: 'Order Removed!' });
};

exports.getOrders = getOrders;
exports.makePayment = makePayment;
exports.placeOrder = placeOrder;
exports.editOrderStatus = editOrderStatus;
exports.deleteOrder = deleteOrder;
