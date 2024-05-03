const Category_Equipement = require('../models/Category');


// Create new category
const CreateCategory = async (req, res) => {
    const { name, description} = req.body; 
    const user = req.user;

    try {
      
        if (!name || !description ) {
            return res
                .status(400)
                .json({ error: "Category creation failed: Missing required information!" });
        }

        const newCategory = new Category_Equipement({ name, description });
        await newCategory.save();

        res.json({
            success: true,
            message: "Category created successfully",
        });
    } catch (error) {
        res.status(500).json({'error':error})
      }
}

// Get all categories

const GetAllCategories = async (req, res) =>{
    try {
        const { name, description } = req.query;
        
        const query = {};
        if (name) {
            query.name = name;
        }
        if (description) {
            query.description = description;
        }

        const categories = await Category_Equipement.find(query);
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json("Categories not found");
    }
}

// Get category by id

const GetCatergoryById = async (req, res) => {
    try {
        const category = await Category_Equipement.findById(req.params.id);
        
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}



// Update category 

const UpdateCategory = async (req, res) => {
    try {
     
        const updatedCategory = await Category_Equipement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCategory);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
        
}

delete category
const DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ error: "Category deletion failed: Missing required information!" });
        }

        const deletedCategory = await Category_Equipement.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found!" });
        }

        return res.json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        return res
            .status(500)
            .json([
                { error: "Internal server error" },
                { message: `Error deleting Category: ${error.message}` },
            ]);
    }
}

module.exports = {CreateCategory,
     GetAllCategories,
      GetCatergoryById,
       UpdateCategory, 
        DeleteCategory
    };