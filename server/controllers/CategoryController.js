const mongoose = require('mongoose');
const Category_Equipement = require('../models/CategorySchema');


// Create new category
const CreateCategory = async (req, res) => {
    try {
        const {id_category, name, description} = req.body;
        const category = new Category_Equipement({id_category, name, description});
        await category.save();
        res.status(200).json('category created successfully')
    } catch (error) {
        res.status(400).json('Category Creation Failed')
    }
}

// Get all categories

const GetAllCategories = async (req, res) =>{
    try {
        const categories = await Category_Equipement.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json("Categories not found");
    }
}

// Get category by id

const GetCatergoryById = async (req, res) => {
    try {
        const category = await Category_Equipement.find({id_category:req.params});
        if (!category) {
            return res.status(200).json(category);
        }
        res.json(category);
    } catch (error) {
        res.status(400).json("Category not found");        
    }
}

// Update category 

const UpdateCategory = async (req, res) => {
    try {
        const {id_category, name, description} = req.body;
        const category = await Category_Equipement.findByIdAndUpdate(req.params._id, {id_category, name, description}, {new: true});
        if (!category) {
            return res.status(200).json('Category updated successfully');
        }
        res.json(category);
    } catch (error) {
        res.status(400).json("Category not found");
    }
}

// delete category
const DeleteCategory = async (req, res) => {
try {
    const category = await Category_Equipement.findByIdAndDelete({id_category: req.params._id});
    console.log(category)
    if (!category) {
        return res.status(400).json('Delete failed');
    }
    res.json('Category deleted successfully');
} catch (error) {
    return res.status(400).json('Delete failed');
}
}

module.exports = {CreateCategory, GetAllCategories, GetCatergoryById, UpdateCategory, DeleteCategory}