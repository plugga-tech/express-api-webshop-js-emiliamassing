const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order-model');
const ProductModel = require('../models/product-model');

/* GET users listing. */
router.get('/all', async function(req, res) {
  const orders = await OrderModel.find().populate('user');
  res.status(200).json(orders);
});

router.post('/add', async function(req, res) {
  let newOrder = await OrderModel.create(req.body);
  let products = newOrder.products;

  products.map(async ({productId, quantity}) => {
    let products = await ProductModel.findOne({_id: {$eq: productId}});

    let updatedStock = products.stock - quantity;

    let updatedProducts = await ProductModel.updateOne({_id: productId}, {stock: updatedStock});

    console.log('Products', products);
    console.log('Quantity', quantity);
    console.log(updatedProducts);

  });

  res.status(201).json(newOrder);
});

module.exports = router;

