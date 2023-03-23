const express = require('express');
const router = express.Router();
const UserModel = require('../models/user-model');
const CryptoJs = require('crypto-js');

/* GET users listing. */
router.get('/', async function(req, res) {
  const users = await UserModel.find().select('-password');

  res.status(200).json(users);
});

router.post('/userId', async function(req, res) {
  const {_id} = req.body;
  const user = await UserModel.findById({_id});

  res.status(200).json(user);
});

router.post('/add', async function(req, res) {
  let newUser = await UserModel.create({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.SHA3(req.body.password).toString()
  });

  console.log("New user", newUser);
  res.status(201).json(newUser);
});

router.post('/login', async function(req, res) {
  const login = {
    email: req.body.email,
    password: req.body.password
  }

  let findUser = await UserModel.findOne({email: login.email});
  if(CryptoJs.SHA3(login.password).toString() === findUser.password) {
    res.status(201).json({email: findUser.email, _id: findUser.id});

    console.log(findUser.isLoggedIn);
    console.log('Login succecssful');
  } else {
    res.status(401).json('Incorrect email or password');
  }
});

module.exports = router;
