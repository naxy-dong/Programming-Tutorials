const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log("connected!!")
    })
    .catch(err => {
        console.log("it failed!!", err)
    })

//Blueprint for a model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20 //we should not have long product name
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'The price has to be greater than 0, you doodoo head']  //The price has to be greater than 0
    },
    onSale: {
        type: Boolean,
        //It will be false if we don't specify
        default: false
    },
    //We want an type of array of string for the category
    category: {
        type: [String],
        default: ['cycling']
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

const Product = mongoose.model("Product", productSchema)

const bike = new Product({ name: 'Mountain Bike', price: 699 })
bike.save()
// .then(data => {
//     console.log("SUCCESS!", data)
// })
// .catch(err => {
//     console.log("ERROR!", err)
// })

Product.findOneAndUpdate({ name: 'Mountain Bike' }, { price: -10.99 }, { new: true, runValidators: true })
    .then(data => {
        console.log("SUCCESS!", data)
    })
    .catch(err => {
        console.log("ERROR!", err)
    })

productSchema.methods.findProduct = function () {
    const foundProduct = await Product.findOne({ name: 'Bike Helmet' })
    console.log(foundProduct)
}

productSchema.static.blackFridaySale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

const personSchema = new mongoose.Schema(
    { firstName: String, lastName: String }
)

personSchema.virtual('fullName').get(function(){
    return  `${this.firstName} ${this.lastName}`
})

//Perform this operation before it's saved
personSchema.pre('save', async function(){
    console.log(`ABOUT TO SAVE!!`)
})
//Perform this operation after it's saved
personSchema.post('save', async function(){
    console.log(`JUST SAVED!!`)
})

const Person = mongoose.model('Person', personSchema)
const me = new Person({firstName: 'Yuxiang', lastName: 'Dong'})
console.log(me.fullName)