const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product-model');

/* GET users listing. */
router.get('/', async function(req, res) {
  const products = await ProductModel.find();
  res.status(200).json(products);
});

router.post('/add', async function(req, res) {
    let newProduct = await ProductModel.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    });

    console.log('New product created', newProduct);
    res.status(201).json(newProduct);
});

module.exports = router;