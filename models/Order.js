const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: Schema.ObjectId,
        ref: 'Customer'
    },
    products: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Product'
        },
        unitPrice: {
            type: Number
        },
        quantity: {
            type: Number
        },
        amount: {
            type: Number
        }
    }],
    totalAmount: {
        type: Number
    }
});

module.exports = mongoose.model('Order', ordersSchema);