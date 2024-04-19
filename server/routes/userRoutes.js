// User-related routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticate, isAdmin} = require('../middleware/authMiddleware');
const {isAuthenticated} = require('../middleware/authMiddleware');


// GET all users
router.get('/' , isAuthenticated , isAdmin,userController.getAllUsers);
//sort
router.get('/sortUser', userController.getSortUsers);
//Get search 
router.get('/search', userController.searchUser);

// GET a user by ID
router.get('/:id', isAuthenticated , isAdmin, userController.getUserById);


// create a new user
router.post('/' , isAuthenticated , isAdmin, userController.createUser);

// update a user by ID
router.put('/:id' , isAuthenticated , isAdmin,userController.updateUserById);

// Remove a user by ID
router.delete('/:id' , isAuthenticated , isAdmin, userController.deleteUserById);

module.exports = router;
