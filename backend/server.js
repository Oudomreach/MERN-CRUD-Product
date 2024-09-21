const express = require('express');
// import express from 'express';
const dotenv =  require('dotenv');
const {connectDB} = require('./config/dbConnect.js');
const productRoutes = require('./routes/product.route.js');
// import { connectDB } from './config/dbConnect.js';
// import productRoutes from './routes/product.route.js'

dotenv.config();

const app = express();
app.use(express.json()); // acceopt json data in req.body

app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server started`);
})