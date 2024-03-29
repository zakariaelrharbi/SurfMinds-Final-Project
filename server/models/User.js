const mongoose  = require("mongoose");

//Defining User Schema
const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true, 
            trim : true
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            trim : true
        },
        password: { 
            type: String,  
            required: true
        },
        isAdmin: { 
            type: Boolean, 
            default: 'false'
        },
    },{
        timestamps : true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
