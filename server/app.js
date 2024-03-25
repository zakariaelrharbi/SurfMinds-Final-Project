// Our main application file, where you set up Express, middleware, and routes. 
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connect = require('./config/database');
const {PORT} = require('./config/env') ;
const api = require ('./routes/api');
// const userRouters = require('./routes/userRoutes')
// const {SECRET_KEY_SESSION} = require('./config/env')


const app = express();



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', api);

// Configure session management
app.use(cookieParser());
app.use(
    session({
        secret: "TEST", // Secret key used to sign the session ID cookie
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
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}


main();

