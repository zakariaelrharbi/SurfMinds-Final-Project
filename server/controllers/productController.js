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
const products = await Product.find({});
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Not Found' });
    }

}

//Controller Sort
async function getProductsInRange(req, res) {
    const { minPrice, maxPrice } = req.query;
    if (!minPrice || isNaN(minPrice) || !maxPrice || isNaN(maxPrice)) {
        return res.status(400).json({ message: 'Invalid or missing price amounts' });
    }
  
    try {
        const products = await Product.find({ 
            price: { 
                $gte: parseFloat(minPrice),
                $lte: parseFloat(maxPrice) 
            } 
        }).sort({ price: 1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving products' });
    }
  }
  




// Controller pour récupérer un produit par son ID
async function getProductById (req, res){
    try {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product Not found' });
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


  //Controller Search
  async function searchProducts(req, res) {
    const { key } = req.query;

    if (!key || key.trim() === '') {
        return res.status(400).json({ message: 'Missing or invalid search keyword' });
    }

    try {
        const products = await Product.find({
            $or: [
                { title: { $regex: key, $options: 'i' } },
                { description: { $regex: key, $options: 'i' } }
            ]
        });

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error occurred during product search.' });
    }
}





    module.exports = {
        getAllProducts,
        getProductById,
        updateProductById,
        deleteProductById,
        createProduct,
        getProductsInRange,
        searchProducts
      };