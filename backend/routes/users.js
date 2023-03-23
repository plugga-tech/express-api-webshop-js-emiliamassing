const express = require('express');
const router = express.Router();
const UserModel = require('../models/user-model');
const CryptoJs = require('crypto-js');

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const users = await UserModel.find().select('-password');

    res.status(200).json(users);
  } catch (error) {
    console.log('Error', error);
    res.status(400).json({message: 'Could not get users'});
  };
  
});

router.post('/userId', async function(req, res) {
  try {
    const {_id} = req.body;
    const user = await UserModel.findById({_id});

    res.status(200).json(user);
  } catch (error) {
    console.log('Error', error);
    res.status(400).json({message: 'Could not get user'});
  };
  
});

router.post('/add', async function(req, res) {
  try {
    let newUser = await UserModel.create({
      username: req.body.username, 
      email: req.body.email,
      password: CryptoJs.SHA3(req.body.password).toString()
    });

    console.log("New user", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.log('Error', error);
    res.status(404).json({message: 'Could not find categories'});
  };

});

router.post('/login', async function(req, res) {
  try {
    const login = {
      email: req.body.email,
      password: req.body.password
    }; 

    let findUser = await UserModel.findOne({email: login.email});
    if(CryptoJs.SHA3(login.password).toString() === findUser.password) {

      findUser.isLoggedIn = true; 
      await findUser.save();
      res.status(201).json({email: findUser.email, _id: findUser.id});

    } else {
      res.status(401).json('Incorrect email or password');  
    };
  } catch (error) {
    console.log('Error', error);
    res.status(404).json({message: 'Unexpected error'});
  };
  
});

module.exports = router;
