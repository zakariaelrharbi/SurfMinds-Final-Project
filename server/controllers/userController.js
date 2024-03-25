// Controller for product-related operations
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const passport = require('passport');

const register = async(req,res) => {

    try {
        const {username, email, password} = req.body;

        if (!username || !password || !email) {
        return res.status(400).json({ error: "Username, Email and password are required"});
    }
        // Check if user exists
    let existingUser = await User.findOne({$or: [{username}, {email}]});

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new User

    const user = new User({ username : username, email: email, password : hashedPassword});

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error.message);
    res.status(500).send('Server Error');
    }
};


const login = async(req, res) => {

    try{

        const {email , password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }

          const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

        res.status(200).json({
            success: true,
            message: 'Successfully logged in'
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
};

const destroy = async (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).json({
            success: true,
            message: 'Successfully logged out'
        });
        // res.redirect('/');
      });
}

// const home = async (req, res) => {
//     res.send('you are in home page')
// }


module.exports = {
    register,
    login,
    destroy,
    // home
}

