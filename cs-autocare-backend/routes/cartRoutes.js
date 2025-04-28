const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItem, removeCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Route to handle adding items to the cart
router.post('/', protect, addToCart);

// Route to retrieve the cart for the current user
router.get('/', protect, getCart);

// Route to update a specific cart item
router.put('/:itemId', protect, updateCartItem);

// Route to remove a specific item from the cart
router.delete('/:itemId', protect, removeCartItem);

module.exports = router;
