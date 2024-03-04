const mongoose = require('mongoose')

const product_schema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    images: {type: String, required: true},
    category: {type: String, required: true},
    size: {type: Number},
    color: {type: String},
    price: {type: String, required: true},
    availableQty: {type: Number, required: true},
})

const Product = new mongoose.model('Products',product_schema)

module.exports = Product;