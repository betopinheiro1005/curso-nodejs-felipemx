const express = require('express');

const router = express.Router();

const ordersController = require('../controllers/ordersController');

module.exports = function() {
    // post: /orders
    router.post('/orders', ordersController.create);

    // get: /orders
    router.get('/orders', ordersController.index);

    // get: /orders/:id
    router.get('/orders/:id', ordersController.show);

    // get: /orders/customer/:id
    router.get('/orders/customer/:id', ordersController.byCustomer);

    // put: /orders/:id
    router.put('/orders/:id', ordersController.update);

    // delete: /orders/:id
    router.delete('/orders/:id', ordersController.delete);

    return router;
};