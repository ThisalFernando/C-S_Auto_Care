const Cart = require('../models/cartModel');

//@ desc Add to cart
//@ route POST /api/cart/add
//@ access Private
exports.addToCart = async (req, res) => {
    const { productId, size, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            // Create a new cart if one doesn't exist
            cart = new Cart({
                user: req.user._id,
                items: [{ product: productId, size, quantity }]
            });
        } else {
            // Check if the item already exists with the same size
            const itemExists = cart.items.some(item => item.product.toString() === productId && item.size === size);

            if (itemExists) {
                // If item exists, prevent addition
                return res.status(400).json({ message: 'This product with the selected size is already in your cart. Please update the quantity instead of adding it again.' });
            } else {
                // Add new item to cart if it does not exist
                cart.items.push({ product: productId, size, quantity });
            }
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart: ' + error.message });
    }
};


//@ desc Get cart
//@ route GET /api/cart
//@ access Private
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart: ' + error.message });
    }
};

//@ desc Update cart item size and quantity
//@ route PUT /api/cart/
//@ access Private
exports.updateCartItem = async (req, res) => {
    const { itemId, size, quantity } = req.body;

    // Parse quantity as an integer to ensure proper arithmetic operations
    const updatedQuantity = parseInt(quantity, 10);

    if (updatedQuantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    try {
        // First, find the cart and the item within it
        const cart = await Cart.findOne({ 'user': req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item and update it
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Check if the new size variant already exists
        const existingIndex = cart.items.findIndex(item => item.product.equals(cart.items[itemIndex].product) && item.size === size);
        if (existingIndex !== -1 && existingIndex !== itemIndex) {
            // Merge quantities and remove the old item
            cart.items[existingIndex].quantity += updatedQuantity;
            cart.items.splice(itemIndex, 1);
        } else {
            // Update the item in place
            cart.items[itemIndex].size = size;
            cart.items[itemIndex].quantity = updatedQuantity;
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart: ' + error.message });
    }
};


exports.removeCartItem = async (req, res) => {
    const { itemId } = req.params; // Make sure you're getting the ID from params

    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the item exists in the cart
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Pull (remove) the item from the items array
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart: ' + error.message });
    }
};
