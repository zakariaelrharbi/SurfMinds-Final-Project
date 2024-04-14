// Order-related routes
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const {authenticate} = require('../middleware/authMiddleware');
const {isAuthenticated} = require('../middleware/authMiddleware');


// GET all Orders
router.get('/'   ,isAuthenticated  ,orderController.getAllOrders);


// GET a order by ID
router.get('/:id', orderController.getOrderById);


// create a new order
router.post('/' ,isAuthenticated  ,  orderController.createOrder);

// // update a order by ID
router.put('/:id'  ,isAuthenticated  ,orderController.updateOrder);

// // Remove a order by ID
router.delete('/:id',isAuthenticated ,  orderController.deleteOrder);

module.exports = router;
