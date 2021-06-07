const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

module.exports = function() {
    // post: /products
    router.post('/products', productsController.fileUpload, productsController.create);

    // get: /products
    router.get('/products', productsController.index);

    // get: /products/:id
    router.get('/products/:id', productsController.show);

    // put: /products/:id
    router.put('/products/:id', productsController.fileUpload, productsController.update);

    // delete: products/:id
    router.delete('/products/:id', productsController.delete);

    // get: /products/search/:query
    router.get('/products/search/:query', productsController.search);

    return router;
};