const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  items: [
    {
      id: String,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: {type: Number, required: true},
  status: { type: String, default: 'Pending' },
  address: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
