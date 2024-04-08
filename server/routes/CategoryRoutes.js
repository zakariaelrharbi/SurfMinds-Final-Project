const express = require('express');
const CategoryRouter = express.Router();
const {CreateCategory, GetAllCategories, GetCatergoryById, UpdateCategory, DeleteCategory} = require('../controllers/CategoryController')

CategoryRouter.post('/CreateCatergory', CreateCategory);
CategoryRouter.get('/GetAllCategories', GetAllCategories);
CategoryRouter.get('/GetCatergoryById/:_id', GetCatergoryById);
CategoryRouter.put('/UpdateCategory/:id_category', UpdateCategory);
CategoryRouter.delete('/DeleteCategory/:id_category', DeleteCategory);
module.exports = CategoryRouter;