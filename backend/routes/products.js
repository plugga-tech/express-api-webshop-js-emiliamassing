const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product-model');
const CategoryModel = require('../models/category-model');

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const products = await ProductModel.find().populate('category');

    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    console.log('Error', error);
    res.status(400).json({message: 'Could not find products'});
  };
    
});

//Temporary router to find all products in stock
router.get('/inStock', async function(req, res) {
  try {
    const productStock = await ProductModel.find({"stock": {$gt: 0}});

    res.status(200).json(productStock);
    console.log(productStock);
  } catch (error) {
    console.log('Error', error);
    res.status(400).json({message: 'Out of order'});
  };
  
});

router.get('/:id', async function(req, res) {
  try {
    const product = await ProductModel.findOne();

    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    console.log('Error', error);
    res.status(401).json({message: 'Wrong Id'});
  };
  
});

router.post('/add', async function(req, res) {

  try {
    let token = req.body.token;

    if(token === process.env.API_TOKEN){
      let newProduct = await ProductModel.create({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          stock: req.body.stock
      });

      console.log('New product created', newProduct);
      res.status(201).json(newProduct);
    } else{
        res.status(401).json({message: "Wrong API-Key"});
    };
  } catch (error) {
    console.log('Error', error);
    res.status(401).json({message: 'Unexpected error, could not create product'});
  };
  
});

router.get('/category/:id', async function(req, res) {
  try {
    const categoryId = req.params.id;
    const products = await ProductModel.find({'category': categoryId});

    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    console.log('Error', error);
    res.status(401).json({message: 'Wrong Id'});
  };
  
});

module.exports = router;