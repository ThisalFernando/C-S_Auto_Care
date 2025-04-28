const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const nodemailer = require('nodemailer');
const { stockNotificationEmail } = require('../services/emailTemplates');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// @desc Fetch all products
// @route GET /api/products
// @access public
exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access public
exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Create a product
// @route POST /api/products
// @access private/admin
exports.createProduct = asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access private/admin
exports.updateProduct = asyncHandler(async (req, res) => { // Add this to log the incoming request body

    const product = await Product.findById(req.body.id).populate('wishListUsers');

    if (product) {
        const emailHTML = stockNotificationEmail(product);
        if (req.body.isInStock === true) {
            const wishListUsers = product.wishListUsers; // Get the wishListUsers array from the product
            wishListUsers.forEach(element => {
                let mailDetails = {
                    from: 'cs.autocare.lk',
                    to: element.email,
                    subject: '🌟 Good News! Your Wishlist Item is Back in Stock!',
                    text: 'Hello! The item you’ve been waiting for is back in stock. Don’t miss out – shop now and secure your favorite product!',
                    html: emailHTML
                };
                mailTransporter
                    .sendMail(mailDetails,
                        function (err, data) {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log('Email sent successfully');
                            }
                        });
            });
        }

        product.isInStock = req.body.isInStock;
        product.wishListUsers = []; // Clear the wishListUsers array
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }

});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access private/admin

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({
            message: 'Product removed'
        });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});