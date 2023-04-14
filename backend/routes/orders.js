const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order-model');
const ProductModel = require('../models/product-model');

/* GET users listing. */

router.get('/all/:token', async function(req, res) {
  try {
    let token = req.params.token;

    if(token === process.env.API_TOKEN){
      let orders = await OrderModel.find().populate('user');
      res.status(200).json(orders);
    } else {
      res.status(401).json({message: "Wrong API-Key"});
    };
  } catch (error) {
    console.log('Error', error);
    res.status(400).json({message: 'Unexpected error occured'});
  };

});

router.post('/add', async function(req, res) {
  try {
    let newOrder = await OrderModel.create(req.body);
    let products = newOrder.products;

    products.map(async ({productId, quantity}) => {
      let products = await ProductModel.findOne({_id: {$eq: productId}});
  
      let updatedStock = products.stock -= quantity;
  
      await ProductModel.updateOne({_id: productId}, {stock: updatedStock});
    });
  
    res.status(201).json(newOrder);
  } catch (error) {
    console.log('Error', error);
    res.status(400).json({message: 'Could not create order'});
  };

});

router.post('/user', async function(req, res) {
  try {
    let token = req.body.token;

    if(token === process.env.API_TOKEN){
      let orders = await OrderModel.find().populate('user');
  
      res.status(200).json(orders);
    } else{
      res.status(401).json('Incorrect token');
    };
  } catch (error) {
    console.log('Error', error);
    res.status(400).json({message: 'Unexpected error occured'});
  };

});

module.exports = router;

