const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const {errorHandler} = require('./middleware/errorMiddleware');

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

// Configure CORS
app.use(cors({
    origin: '*', // Allows all domains in development, change to specific domains or use a function in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify which methods to allow
    credentials: true // Allow cookies to be sent with requests
}));

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = require("./config/db.js");
connectDB();

app.use('/api/users', require('./routes/userRoutes.js'))
app.use('/api/products', require('./routes/productRoutes.js'))
app.use('/api/cart', require('./routes/cartRoutes.js'))
app.use('/api/wishlist', require('./routes/wishlistRoutes.js'))

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀Server is up and running on port number:${PORT}`)   
})