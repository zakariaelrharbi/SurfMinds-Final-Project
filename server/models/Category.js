const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true
        },
    description: { 
        type: String 
    },
},{
    timestamps : true
});

const Category_Equipement = mongoose.model('Category_Equipement', categorySchema);

module.exports = Category_Equipement;