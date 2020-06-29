const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  orders: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Order' }],
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
