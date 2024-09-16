import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    }
}, {
    timestamps: true // createdAt, updatedAt
});

const Product = mongoose.model('product', productSchema);

export default Product;
// module.exports = Product;