// Product schema and model

const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true , unique:true },
  email: { type: String, required: true , unique:true },
  password: { type: String, required: true },
  tel: { type: Number  },
  address: { type: String },
  role:{
    type: String,
  enum: ['user', 'admin']},
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;