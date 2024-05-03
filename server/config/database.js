// Database configuration
const mongoose = require('mongoose'); 
// const {DB} = require('./env')



const uri = "mongodb+srv://zelrharbi:Surfminds+2024@surfmind.tuxt3lv.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
    try {
      
      await mongoose.connect(uri);
      console.log("Connected to the database Successfully");
    } 
    catch (error) {
      console.log('Error connecting to the database:',error);
    }
  };

module.exports = connect