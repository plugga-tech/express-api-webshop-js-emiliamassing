const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    categoryName: {
        type: String
    }
});

module.exports = mongoose.model('category', CategorySchema);