const User = require('../models/User'); 
const bcrypt = require('bcrypt');

const login = (req, res) => {
    
    res.status(200).json({
        success: true,
        message: 'Successfully logged in'
    })
   
    
};

const register = async (req, res) => {
    const {username, password , email} = req.body;
    

    if (!username || !password || !email) {
        return res.status(400).json({ error: "Username, Email and password are required"});
    }

    const existingUser = await User.findOne({$or: [{username}, {email}]});
    if (existingUser) {
        return res.status(400).json({ error: "User or Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ username : username, email: email, password : hashedPassword});

    await user.save();
    res.json({
        success: true,
        message: 'Successfully registered'
    })
}
const destroy = async (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).json({
            success: true,
            message: 'Successfully logged out'
        })
    });
}

module.exports = {
    login,
    register,
    destroy
}