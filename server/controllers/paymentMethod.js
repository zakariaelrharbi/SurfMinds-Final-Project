const PaymentMethod = require('../models/paymentMethod');

// Create a new payment method
exports.createPaymentMethod = async (req, res) => {
    try {
        const { type } = req.body;

        // Create the payment method
        const paymentMethod = new PaymentMethod({
            type
        });

        // Save the payment method to the database
        await paymentMethod.save();

        res.status(201).json(paymentMethod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all payment methods
exports.getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.json(paymentMethods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getPaymentMethodById = async (req, res) => {
    try {
        const paymentMethodId = req.params.id;
        const paymentMethod = await PaymentMethod.findById(paymentMethodId);
        if (!paymentMethod) {
            return res.status(404).json({ error: 'Payment method not found' });
        }
        res.json(paymentMethod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.deletePaymentMethod = async (req, res) => {
    try {
        const paymentMethodId = req.params.id;
        const paymentMethod = await PaymentMethod.findByIdAndDelete(paymentMethodId);
        if (!paymentMethod) {
            return res.status(404).json({ error: 'Payment method not found' });
        }
        res.json({ message: 'Payment method deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};