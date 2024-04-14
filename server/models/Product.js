// User schema and model
const mongoose  = require("mongoose");

//Defining User Schema
const productSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true,  
            // unique: true, 
            trim : true
        },
        description : {
            type: String, 
            required: true, 
            // unique: true, 
            trim : true
        },
        quantity : {
            type : Number,
            required : true,
        },
        price : {
            type : Number,
            required : true,
        },
        status : {
            type : String,
            required : true,
        }
    },{
        timestamps : true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
