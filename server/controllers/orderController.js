const Order = require('../models/Order');
const PaymentMethod = require('../models/paymentMethod');
const Product = require('../models/Product');
const User = require('../models/User');


// Create a new order
async function createOrder(req, res) {
    try {
        const { products, paymentMethodId, shippingAddress,orderDate } = req.body;
        // const userId = req.user._id;
        // Fetch payment method details from database
        const paymentMethod = await PaymentMethod.findById(paymentMethodId);
        if (!paymentMethod) {
            return res.status(404).json({ error: 'Payment method not found' });
        }
        
        // Calculate total price of products (assuming Product model exists)
        let totalPrice = 0;
        for (const productId of products) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ error: `Product with ID ${productId} not found` });
            }
            totalPrice += product.price;
        }
        
        // Create the order
        const order = new Order({
            // userId: userId,
            products,
            totalPrice,
            paymentMethod,
            shippingAddress,
            orderDate
            // Add other fields as needed
        });
        
        // console.log('hello' , userId)
        // Save the order to the database
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const update = req.body;
        const options = { new: true };
         // Fetch the order by ID
         let order = await Order.findById(orderId);
         if (!order) {
             return res.status(404).json({ error: 'Order not found' });
         }
 
         // Update the order with the provided data
         Object.assign(order, update);
 
         // Recalculate the total price if products array is updated
         if (update.products) {
             let totalPrice = 0;
             for (const productId of order.products) {
                 const product = await Product.findById(productId);
                 if (!product) {
                     return res.status(404).json({ error: `Product with ID ${productId} not found` });
                 }
                 totalPrice += product.price;
             }
             order.totalPrice = totalPrice;
         }
 
         // Save the updated order to the database
         order = await order.save();
 
         res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
 //Controller Search
 const searchOrder = async (req, res) => {
    try {
        const { key } = req.query; 
        const orders = await Order.find({
            $or: [
                { products: { $regex: key, $options: 'i' } }, 
                { shippingAddress: { $regex: key, $options: 'i' } }, 
               
            ]
        });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    searchOrder
  };

