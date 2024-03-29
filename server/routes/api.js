// Main API routes

const express = require('express');
const authRoute = require ('./authRoutes');
const router = express.Router();


router.use('/auth', authRoute);


module.exports = router