// Controller for user-related operations

//import the model User
const User = require('../models/User');




 
// Controller pour créer un nouveau produit
async function createUser (req, res){
  const { username, email, password ,isAdmin} = req.body;
    try {
    
      if (!username || !email || !password || !isAdmin ) {
        return res
            .status(400)
            .json({ error: "User creation failed: Missing required information!" });
    }
    const newUser = new User({ username, email, password ,isAdmin });
    await newUser.save();

    res.json({
        success: true,
        message: "User created successfully",
    });
        
    } 
    catch (error) {
      res.status(500).json({'error':error})
    }
};
   



// Controller pour récupérer tous les produits
async function getAllUsers(req, res) {
    try {

      // Extract query parameters for pagination
    const page = parseInt(req.query.page) || 0; // Default page is 1
    const limit = 2; // Number of users per page
    const skip = page * limit;

    // Fetch total count of users
    const totalCount = await User.countDocuments({});

    // Fetch users with pagination
    const users = await User.find({})
      .skip(skip)
      .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Determine if there are previous and next pages
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 0;

    // Create pagination object
    const pagination = {
      currentPage: page,
      hasNextPage,
      hasPrevPage,
      totalProducts: users.length,
    };

    // Create response object
    const response = {
      users,
      pagination,
    };

    res.status(200).json(response);

    } catch (err) {
      res.status(500).json({ message: 'User not found' });
    }
}

// Controller pour récupérer un produit par son ID
async function getUserById (req, res){
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not Found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }}

    
// Controller pour mettre à jour un produit par son ID
 async function  updateUserById (req, res) {
    try {
     
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Controller pour supprimer un produit par son ID
 async function deleteUserById (req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }






    module.exports = {
        getAllUsers,
        getUserById,
        updateUserById,
        deleteUserById,
        createUser
      };