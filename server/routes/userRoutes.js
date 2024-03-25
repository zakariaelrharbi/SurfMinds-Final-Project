// User-related routes

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const {authenticate} = require('../middleware/authMiddleware');




// User registration route
router.post('/register' ,userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.destroy)
// router.post('/', userController.home);
// router.get('/logout', userController.destroy);

module.exports = router;
