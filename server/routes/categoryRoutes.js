const express = require('express');
const router = express.Router();
const {authenticate, isAdmin} = require('../middleware/authMiddleware');
const {isAuthenticated} = require('../middleware/authMiddleware');

const CategoryController = require('../controllers/categoryController');

router.post('/',isAuthenticated , isAdmin ,CategoryController.CreateCategory);
router.get('/', CategoryController.GetAllCategories);
router.get('/:id', CategoryController.GetCatergoryById);
router.put('/:id',isAuthenticated , isAdmin , CategoryController.UpdateCategory);
router.delete('/:id' ,isAuthenticated , isAdmin , CategoryController.DeleteCategory);

module.exports = router;