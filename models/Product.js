const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    sku: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true
    },
    name: {
        type: String,
        trime: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Product', productsSchema);