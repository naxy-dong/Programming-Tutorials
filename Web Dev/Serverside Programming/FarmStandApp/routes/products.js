const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const methodOverride = require('method-override')
const AppError = require('../AppError')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const sessionOption = { secret: 'THIS IS A VERY BAD SECRET', resave: false, saveUninitialized: false }
router.use(session(sessionOption))
router.use(flash())
router.use(methodOverride('_method'))
// //Whenever we need to have a post request, the request will not be available to use immediately
// //We need to parse the request to an url first
router.use(express.urlencoded({ extended: true }))
router.use(morgan('tiny'))

//middleware
// router.use((req,res,next) =>{
//     if(req.query.isAdmin){
//         next()
//     }
//     else{
//         res.send("Sorry NOT an Admin!")
//     }
// })

router.use((req, res, next) => {
    res.locals.messages = req.flash('success')
    next()
})

//pattern: make the function async, then we await the mongoose operation
router.get('/', async (req, res) => {
    const { category } = req.query
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    }
    else {
        const products = await Product.find({})
        res.render('products/index', {
            products, category: "All",
            messages: req.flash('success')
        })
    }
})

const categories = ['fruit', 'vegetable', 'dairy']
//This needs to be before /products/:id because this is more specific
//Otherwise it will run the code inside router.get('/products/:id'
router.get('/new', (req, res) => {
    res.render('products/new', { categories })
})

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(res, res, next).catch(e => next(e))
    }
}

router.get('/:id', async (req, res, next) => {
    //we get that id
    const { id } = req.params
    //find the product using that id
    const product = await Product.findById(id)
    //responding with a template
    if (!product) {
        throw new AppError(404, "Product not found")
    }
    res.render('products/detail', { product })
})

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

//the form sent a post request to this url.
router.post('/', async (req, res, next) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        //req.flash(key, message)
        req.flash('success', 'successfuly made a new product!')
        res.redirect(`/products/${newProduct._id}`)
    }
    catch (e) {
        next(e)
    }
})

//Put request is used to replace the whole product
//Patch request is used to change a portion of the product
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect(`/products`)
})

module.exports = router