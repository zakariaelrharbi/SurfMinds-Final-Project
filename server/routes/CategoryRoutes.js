const express = require('express');
const CategoryRouter = express.Router();
const {CreateCategory, GetAllCategories, GetCatergoryById, UpdateCategory, DeleteCategory} = require('../controllers/CategoryController')

CategoryRouter.post('/CreateCatergory', CreateCategory);
CategoryRouter.post('/GetAllCategories', GetAllCategories);
CategoryRouter.post('/GetCatergoryById/:_id', GetCatergoryById);
CategoryRouter.put('/UpdateCategory/:_id',UpdateCategory);
CategoryRouter.delete('/DeleteCategory/:_id', DeleteCategory);
module.exports = CategoryRouter;