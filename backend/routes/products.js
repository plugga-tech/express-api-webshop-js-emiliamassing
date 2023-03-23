const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product-model');

/* GET users listing. */
router.get('/', async function(req, res) {
    const products = await ProductModel.find();

    res.status(200).json(products);
    console.log(products);
});

//Temporary router to find all products in stock
router.get('/inStock', async function(req, res) {
    const productStock = await ProductModel.find({"stock": {$gt: 0}});

    res.status(200).json(productStock);
    console.log(productStock);
});

router.get('/:id', async function(req, res) {
    const product = await ProductModel.findOne();

    res.status(200).json(product);
    console.log(product);
});

router.post('/add', async function(req, res) {
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
});

module.exports = router;