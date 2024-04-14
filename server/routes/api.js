// Main API routes

const express = require('express');
const authRoute = require ('./authRoutes');
const productRoute = require ('./productRoutes');
const orderRoute = require ('./orderRoutes');
const paymentMethodRoute = require ('./paymentMethodeRoutes');
const categoryRoute = require ('./categoryRoutes');
const userRoute = require ('./userRoutes');
const router = express.Router();


router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);
router.use('/paymentmethod', paymentMethodRoute);
router.use('/category', categoryRoute);
router.use('/user', userRoute);




module.exports = router