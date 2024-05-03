// User schema and model
const mongoose  = require("mongoose");

//Defining User Schema
const OrderSchema = new mongoose.Schema(
    {
        costumerId :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        totalPrice: {
            type: Number,
            // required: true
        },
        shippingAddress : {
            type: String, 
            required: true, 
            // unique: true, 
            trim : true
        },
        orderDate: {
            type: Date,
            default: Date.now
        },

    },{
        timestamps : true
    }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
