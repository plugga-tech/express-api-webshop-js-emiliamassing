const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    Lightsaber: {
        type: String,
    },
    Game: {
        type: String,
    },
    Movie: {
        type: String, 
    },
    Costume: {
        type: String
    }
});

module.exports = mongoose.model('category', CategorySchema);