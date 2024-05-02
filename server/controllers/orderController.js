const Order = require('../models/Order');
const PaymentMethod = require('../models/paymentMethod');
const Product = require('../models/Product');



// Create a new order
async function createOrder(req, res) {
    try {
        const {  products, paymentMethodId, shippingAddress,orderDate } = req.body;
        const costumerId = req.user._id.toString();
        // console.log(costumerId);
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
            costumerId,
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

async function getAllOrders(req, res) {
    try {
        // Extract query parameters for pagination
      const page = parseInt(req.query.page) || 0; // Default page is 1
      const limit = 2; // Number of products per page
      const skip = page * limit;
  
      // Fetch total count of products
      const totalCount = await Order.countDocuments({});
  
      // Fetch products with pagination
      const orders = await Order.find({})
        .skip(skip)
        .limit(limit);
  
      // Calculate total pages
      const totalPages = Math.ceil(totalCount / limit);
  
      // Determine if there are previous and next pages
      const hasNextPage = page < totalPages-1;
      const hasPrevPage = page > 0;
  
      // Create pagination object
      const pagination = {
        currentPage: page,
        hasNextPage,
        hasPrevPage,
        totalOrders: orders.length,
        totalPages
      };
  
      // Create response object
      const response = {
        orders,
        pagination
      };
  
      res.status(200).json(response);
      } catch (err) {
        res.status(500).json({ message: 'Non trouvé' });
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

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
  };

