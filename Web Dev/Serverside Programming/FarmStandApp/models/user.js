const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("connected!!")
    })
    .catch(err => {
        console.log("it failed!!", err)
    })

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

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})


const Product = mongoose.model('Product', productSchema)
const User = mongoose.model('User', userSchema)
const makeUser = async () => {
    const user = new User({name: "Harry Potter"})
    const banana = new Product({
        name:"banana",
        price: '1.99',
        category: 'fruit'
    })
    const spinach= new Product(
    {
        name:"spinach",
        price: '5.99',
        category: 'vegetable'
    })
    user.products.push(banana)
    user.products.push(spinach)
    await banana.save()
    await spinach.save()
    await user.save()
    // res = await user.save()
    // console.log(res)
}

// makeUser()
User.findOne({ name: "Harry Potter" })
    .populate('products')
    .then(res => console.log(res))

//module.exports = Product