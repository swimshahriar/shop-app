const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, minlenth: 10 },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);
