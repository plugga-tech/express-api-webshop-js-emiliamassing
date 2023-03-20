const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', ordersRouter);

async function init() {
    try {
        const options = {useNewUrlParser: true, useUnifiedTopology: true};
        await mongoose.connect('mongodb://127.0.0.1:27017', options)
        console.log('Connected to database');
    } catch (err) {
        console.log("error", err);
    }
};

module.exports = app;

init();