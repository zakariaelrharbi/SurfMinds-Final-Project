// require('dotenv').config()
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const connect = require('./config/database');
const api = require('./routes/api');
const stripe = require('stripe')("sk_test_51P4qnCGGn1OHPdbwLOZLooJbMeyEnXr2FMCCZgjFkQ7wCoKy3X68bN06fQbwP9DgKei3dp4MVlrpyiRqugNdimpw00j7pXDmsm");
const cors = require('cors')
const dotenv = require("dotenv");

dotenv.config();



const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin :'http://localhost:5173',
  credentials:true,
}))

// Configure session management
app.use(cookieParser());
app.use(
    session({
        secret: 'TEST', // Secret key used to sign the session ID cookie
        resave: false, // Whether to save the session for every request, even if it hasn't changed
        saveUninitialized: true, // Whether to save uninitialized sessions (new but not modified)
        cookie: {
          maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day)
          secure: false, // Set to true if your app is served over HTTPS
          httpOnly: true // Ensures that the cookie is only accessible via HTTP(S) and not JavaScript
          // Other cookie options...
        }
      })
);

require('./config/passport');

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Define tha Main function
async function main() {
    await connect();

    app.use('/api', api);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

main();