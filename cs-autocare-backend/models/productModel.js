const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imgURL: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subHeading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    soldCount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    sizes: [String],
    category: {
        type: String,
        required: true
    },
    wishListUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false
    }]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;