const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// Route to add a product to the wishlist
router.post('/', protect, addToWishlist);

// Route to retrieve the wishlist for the current user
router.get('/', protect, getWishlist);

// Route to remove a product from the wishlist
router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;
