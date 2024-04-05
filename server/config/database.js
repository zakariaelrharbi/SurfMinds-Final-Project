// Database configuration
// Our main application file, where you set up Express, middleware, and routes. 
const mongoose=require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Database is connected...')        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        // kill my app if there is an error
        process.exit(1);
    }
}

module.exports = ConnectDB;