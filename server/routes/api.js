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
router.use('/products', productRoute);
router.use('/orders', orderRoute);
router.use('/paymentmethods', paymentMethodRoute);
router.use('/categories', categoryRoute);
router.use('/users', userRoute);




module.exports = router