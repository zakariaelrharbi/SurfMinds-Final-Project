// Controller for user-related operations

//import the model Product
const Product = require('../models/Product');

// Controller pour créer un nouveau produit
async function createProduct (req, res){
  const { title, description, quantity, price, status } = req.body;
    try {
    
      if (!title || !description || !quantity || !price || !status ) {
        return res
            .status(400)
            .json({ error: "Product creation failed: Missing required information!" });
    }
    const newProduct = new Product({ title, description, quantity, price, status });
    await newProduct.save();

    res.json({
        success: true,
        message: "Product created successfully",
    });
        
    } 
    catch (error) {
      res.status(500).json({'error':error})
    }
};
   



// Controller pour récupérer tous les produits
async function getAllProducts(req, res) {
    try {
      // Extract query parameters for pagination
    const page = parseInt(req.query.page) || 0; // Default page is 1
    const limit = 2; // Number of products per page
    const skip = page * limit;

    // Fetch total count of products
    const totalCount = await Product.countDocuments({});

    // Fetch products with pagination
    const products = await Product.find({})
      .skip(skip)
      .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Determine if there are previous and next pages
    const hasNextPage = page < totalPages-1;
    const hasPrevPage = page > 0;

    // Create pagination object
    const pagination = {
      currentPage: page,
      hasNextPage,
      hasPrevPage,
      totalProducts: products.length,
      totalPages
    };

    // Create response object
    const response = {
      products,
      pagination
    };

    res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ message: 'Non trouvé' });
    }
}


// Controller pour récupérer un produit par son ID
async function getProductById (req, res){
    try {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }}

    
// Controller pour mettre à jour un produit par son ID
 async function  updateProductById (req, res) {
    try {
     
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Controller pour supprimer un produit par son ID
 async function deleteProductById (req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
    module.exports = {
        getAllProducts,
        getProductById,
        updateProductById,
        deleteProductById,
        createProduct
      };