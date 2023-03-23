const express = require('express');
const CategoryModel = require('../models/category-model');
const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let categories = await CategoryModel.find();

  res.status(200).json(categories);
});

router.post('/add', async function(req, res) {
  let token = req.body.token;

  if(token === process.env.API_TOKEN){
    let newCategory = await CategoryModel.create({
      name: req.body.name
    });

    console.log('New Category added', newCategory);
    res.status(201).json(newCategory);
  }else {
    res.status(401).json({message: "Wrong API-Key"});
  }
});

module.exports = router; 