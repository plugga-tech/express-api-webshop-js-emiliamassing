const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,  
        ref: 'user'
    },
    products: {
        type: [mongoose.Types.ObjectId],
        ref: 'products',
        quantity: Number
    },
    orderNumer: Number
});

module.exports = mongoose.model('order', OrderSchema);