const Wishlist = require('../models/wishListModel')
const Product = require('../models/productModel');

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    try {
        // Attempt to find or create a wishlist
        //let wishlist = await Wishlist.findOne({ user: req.user._id });
        let product = await Product.findById(productId);
        let message = '';

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user is already in the product's wishlistUsers array
        if (!product.wishListUsers.includes(req.user._id)) {
            product.wishListUsers.push(req.user._id);
            message = 'Wishlist created and product added.';
        } else {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        await product.save();

        res.status(201).json({ product, message });

    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist: ' + error.message });
    }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
    const {
        productId
    } = req.params; // Assuming productId is passed as URL parameter

    try {
        const wishlist = await Wishlist.findOne({
            user: req.user._id
        });
        if (!wishlist) {
            return res.status(404).json({
                message: 'Wishlist not found'
            });
        }

        // Remove product from wishlist
        const index = wishlist.products.indexOf(productId);
        if (index !== -1) {
            wishlist.products.splice(index, 1);
            await wishlist.save();
            res.status(200).json(wishlist);
        } else {
            return res.status(404).json({
                message: 'Product not found in wishlist'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error removing from wishlist: ' + error.message
        });
    }
};

// Retrieve the wishlist
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user._id
        }).populate('products');
        if (!wishlist) {
            return res.status(404).json({
                message: 'Wishlist not found'
            });
        }
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching wishlist: ' + error.message
        });
    }
};