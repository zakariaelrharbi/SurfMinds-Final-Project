const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id_category: { type: String, required: true, unique: true },
  name: { type: String, required: true ,unique:true},
  description: { type: String },
});

const Category_Equipement = mongoose.model('Category_Equipement', categorySchema);

module.exports = Category_Equipement;