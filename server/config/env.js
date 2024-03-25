// Environment variables
require('dotenv').config();
module.exports = {
    PORT : process.env.SERVER_PORT,
    SECRET_KEY_SESSION : process.env.SECRET_KEY_SESSION,
    DB : process.env.DB
} 