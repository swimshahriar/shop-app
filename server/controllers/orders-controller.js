const Order = require('../models/orders-model');
const { validationResult } = require('express-validator');

// Get All the Orders
const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
    res.json({ orders: orders });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!orders) {
    res.json({ message: 'No orders Found!😭' });
  }
};

// Place an Order
const placeOrder = async (req, res, next) => {
  const { items, totalPrice, address, userId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  const order = new Order({
    items,
    totalPrice,
    address,
    userId,
  });

  try {
    await order.save();
    res.json({ message: 'Order placed successfully', order: order });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
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
    res.json({ message: 'Order Status changed!', updatedOrder: existingOrder });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
};

// Delete an Order
const deleteOrder = async (req, res, next) => {
  const { oid } = req.params;

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

  try {
    existingOrder.remove();
    res.json({ message: 'Order Removed!' });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }
};

exports.getOrders = getOrders;
exports.placeOrder = placeOrder;
exports.editOrderStatus = editOrderStatus;
exports.deleteOrder = deleteOrder;
