const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');

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
app.use('/api/products', productsRouter);
app.use('/api/categories', categoryRouter);

async function init() {
    try {
        const options = {useNewUrlParser: true, useUnifiedTopology: true};
        await mongoose.connect(process.env.MONGODB_URI, options)
        console.log('Connected to database');
    } catch (err) {
        console.log("error", err);
    }
};

module.exports = app;

init();