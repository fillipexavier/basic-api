const { Wallet, validate } = require('../models/wallet');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const wallets = await Wallet.find().sort('user');
  res.send(wallets);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let wallet = new Wallet({
    user: req.body.user,
    coin: req.body.coin,
    origin: req.body.origin,
    create_by: req.body.create_by,
    create_at: req.body.create_at,
  });
  wallet = await wallet.save();
  res.send(wallet);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const wallet = await Wallet.findByIdAndUpdate(
    req.params.id,
    {
      user: req.body.user,
      coin: req.body.coin,
      origin: req.body.origin,
      create_by: req.body.create_by,
      create_at: req.body.create_at,
    },
    { new: true },
  );
  if (!wallet)
    return res.status(404).send('The wallet with the given ID was not found.');

  res.send(wallet);
});

router.delete('/:id', async (req, res) => {
  const wallet = await Wallet.findByIdAndRemove(req.params.id);
  if (!wallet)
    return res.status(404).send('The wallet with the given ID was not found.');

  res.send(wallet);
});

router.get('/:id', async (req, res) => {
  const wallet = await Wallet.findById(req.params.id);

  if (!wallet)
    return res.status(404).send('The wallet with the given ID was not found.');

  res.send(wallet);
});

module.exports = router;
