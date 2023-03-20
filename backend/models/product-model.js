const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number, 
        required: true
    },
    category: {
        type: String
    }, 
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', ProductSchema);