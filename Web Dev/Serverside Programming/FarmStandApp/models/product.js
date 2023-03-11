const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    category: {
        type: String,
        enums: ['fruit', 'vegetable', 'dairy'],
        lowercase: true
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product