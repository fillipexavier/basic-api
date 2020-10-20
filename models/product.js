const Joi = require('joi');
const mongoose = require('mongoose');

const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlenght: 5,
      maxlength: 50,
    },
    active: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
      minlenght: 5,
      maxlenght: 50,
    },
  }),
);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().min(5).max(50).required(),
    active: Joi.boolean(),
  };
  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
