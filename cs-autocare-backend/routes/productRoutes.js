const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

const { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct 
} = require('../controllers/productController');


// Route to get all products
router.get('/', getProducts);

// Route to get a single product
router.get('/:id', getProductById);

// Route to create a product
router.post('/', protect, admin, createProduct);

// Route to update a product
router.put('/:id', protect, admin, updateProduct);

// Route to delete a product
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;

