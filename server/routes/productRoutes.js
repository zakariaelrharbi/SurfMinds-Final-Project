// Product-related routes
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {authenticate, isAdmin} = require('../middleware/authMiddleware');
const {isAuthenticated} = require('../middleware/authMiddleware');


// GET all products
router.get('/' ,productController.getAllProducts);


// GET a product by ID
router.get('/:id', productController.getProductById);


// create a new product
router.post('/', isAuthenticated , isAdmin , productController.createProduct);

// update a product by ID
router.put('/:id',isAuthenticated , isAdmin ,productController.updateProductById);

// Remove a product by ID
router.delete('/:id',isAuthenticated , isAdmin , productController.deleteProductById);

module.exports = router;
