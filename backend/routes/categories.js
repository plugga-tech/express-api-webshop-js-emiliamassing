const express = require('express');
const CategoryModel = require('../models/category-model');
const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
  try{
    let categories = await CategoryModel.find();

    res.status(200).json(categories);
  } catch(error) {
    console.log('Error', error);
    res.status(404).json({message: 'Could not find categories'});
  }
 
});

router.post('/add', async function(req, res) {
  try {
    let token = req.body.token;
    if(token === process.env.API_TOKEN){
      let newCategory = await CategoryModel.create({
        name: req.body.name
      });
  
      console.log('New Category added', newCategory);
      res.status(201).json(newCategory);
    }else {
      res.status(401).json({message: "Wrong API-Key"});
    };
  } catch (error) {
    res.status(400).json({message: 'Unexpected error occured'});
  }
  
});

module.exports = router; 