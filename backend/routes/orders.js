const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order-model');

/* GET users listing. */
router.get('/', async function(req, res) {
  const orders = await OrderModel.find().populate('user');
  res.status(200).json(orders);
});

router.post('/add', async function(req, res) {
  const order = await OrderModel.create(req.body);
  res.status(201).json(order);
});

module.exports = router;