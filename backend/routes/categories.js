const express = require('express');
const CategoryModel = require('../models/category-model');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('categories');
});

router.post('/add', async function(req, res) {
  let newCategory = await CategoryModel.create({
    name: req.body.name
  });

  console.log('New Category added', newCategory);
  res.status(201).json(newCategory);
});

module.exports = router; 