// User-related routes
const express = require('express');
const passport = require('passport');
const router = express.Router();
const validateLoginInput = require('../validations/loginInput.validator');
const validateRegisterInput = require('../validations/registerInput.validator');
const {authenticate, isAdmin} = require('../middleware/authMiddleware');
const {isAuthenticated} = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');





// Auth registration route

router.get('/Dashboard',isAuthenticated ,isAdmin, (req,res)=> {
    res.send('Welcome to dashboard');
});
router.post('/register', [validateRegisterInput] ,authController.register);
router.post('/login', [validateLoginInput] ,authenticate ,authController.login);
router.get('/home', isAuthenticated , (req,res)=>{
    res.send('WELCOME');
});
router.get('/logout', authController.destroy)

module.exports = router;
