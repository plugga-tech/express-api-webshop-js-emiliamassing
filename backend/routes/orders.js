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
    console.log(updatedStock);

  });

  res.status(201).json(newOrder);
});

//Route för att ta emot en order:
// X Ta emot alla produkter som skickas i order 
// X Loopa igenom produkter, tex en map, där vi kör en findOne på produktens _id
// X På hittade produkter så minskar vi lager antalet med det antal som det är beställt av produkten.
// X Spara det ändrade produkten i databasen 
// Spara order

module.exports = router;

