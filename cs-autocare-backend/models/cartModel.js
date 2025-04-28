const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1  // Ensure that at least 1 or more items must be added
    },
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    items: [cartItemSchema]
}, { timestamps: true });

// Ensuring that the same product and size combination can only be added once per cart
cartSchema.index({ user: 1, 'items.product': 1, 'items.size': 1 }, { unique: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
