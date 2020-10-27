const Joi = require('joi');
const mongoose = require('mongoose');

const Wallet = mongoose.model(
  'Wallet',
  new mongoose.Schema({
    user: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    coin: {
      type: Boolean,
      default: false,
    },
    origin: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    create_by: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    create_at: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  }),
);

function validateWallet(Wallet) {
  const schema = {
    user: Joi.string().min(2).max(50).required(),
    origin: Joi.string().min(5).max(50).required(),
    create_by: Joi.string().min(5).max(50).required(),
    create_at: Joi.string().min(5).max(50).required(),
    coin: Joi.boolean(),
  };
  return Joi.validate(Wallet, schema);
}

exports.Wallet = Wallet;
exports.validate = validateWallet;
