const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    login: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 12,
    },
    role: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  }),
);

function validateCustomer(customer) {
  const schema = {
    login: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    role: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
