// Database configuration
const mongoose = require('mongoose'); 
// const {DB} = require('./env')



const connect = async () => {
    try {
      
      await mongoose.connect('mongodb://127.0.0.1:27017/surfminds');
      console.log("Connected to the database Successfully");
    } 
    catch (error) {
      console.log('Error connecting to the database:',error);
    }
  };

module.exports = connect