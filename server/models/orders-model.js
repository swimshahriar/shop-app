const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  address: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Order', orderSchema);
