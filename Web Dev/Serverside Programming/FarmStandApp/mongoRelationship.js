//This is mainly used for testing purposes to test an existing product
const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("connected!!")
    })
    .catch(err => {
        console.log("it failed!!", err)
    })


const seedProducts = [
    {
        name:"banana",
        price: '1.99',
        category: 'fruit'
    },
    {
        name:"spinach",
        price: '5.99',
        category: 'vegetable'
    },
    {
        name:"apple",
        price: '3.99',
        category: 'fruit'
    },
    {
        name:"milk",
        price: '7.99',
        category: 'dairy'
    }
]

//If anyone of them does not pass validation, none of them will be inserted
Product.insertMany(seedProducts)
.then(data =>{
    console.log(data)
})
.catch(err =>{
    console.log(err)
})