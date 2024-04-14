const express = require('express');
const router = express.Router();
const {authenticate, isAdmin, isAuthenticated} = require('../middleware/authMiddleware');

const paymentMethod = require('../controllers/paymentMethod');


router.get('/' ,isAuthenticated , isAdmin , paymentMethod.getAllPaymentMethods);

router.get('/:id' ,isAuthenticated , isAdmin , paymentMethod.getPaymentMethodById);

router.post('/' ,isAuthenticated , isAdmin , paymentMethod.createPaymentMethod);

router.delete('/:id' ,isAuthenticated , isAdmin , paymentMethod.deletePaymentMethod);


module.exports = router;
