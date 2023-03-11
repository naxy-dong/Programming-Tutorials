const express = require('express')
const app = express()

// const flash = require('connect-flash')
//app.use(flash())
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const AppError = require('./AppError')

const ejsMate = require('ejs-mate')
const productRoutes = require('./routes/products')
app.use('/products', productRoutes)

//an engine that parse or "make sense" of ejs
app.engine('ejs', ejsMate)
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
//Whenever we need to have a post request, req.body will not be available to use immediately
//We need to parse the request to an url first
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("connected!!")
    })
    .catch(err => {
        console.log("it failed!!", err)
    })


/** ============================================================================== */
const verifyPassword = ((req, res, next)=>{
    const {password} = req.query
    if(password === '123456'){
        next()
    }
    res.send('You Need a correct password!!')
})

app.get('/secret', verifyPassword, async (req, res) => {
    res.send('My secret is that I have been using a banana pencil case for 5 years')
})

app.get('/error', (req,res)=>{
    chicken.fly()
}) 

app.get('/admin', (req, res) => {
    //403 is forbidden
    throw new AppError(401,"THIS IS NOT OK! YOU ARE NOT ADMIN")
})

/** ============================================================================== */
// app.get('/products', async (req, res) => {
//     const { category } = req.query
//     if (category) {
//         const products = await Product.find({ category })
//         res.render('products/index', { products, category })
//     }
//     else {  
//         const products = await Product.find({})
//         res.render('products/index', { products, category :"All" })
//     }
// })

// const categories = ['fruit', 'vegetable', 'dairy']
// //This needs to be before /products/:id because this is more specific
// //Otherwise it will run the code inside app.get('/products/:id'
// app.get('/products/new', (req, res) => {
//     res.render('products/new', { categories })
// })

// //THIS MAKES REQ.params undefined!!!! WHY???????
// function wrapAsync(fn){
//     return function(req, res, next){
//         fn(res, res, next).catch(e => next(e))
//     }
// }

// app.get('/products/:id', async (req, res, next) => {
//     //we get that id
//     const { id } = req.params
//     //find the product using that id
//     const product = await Product.findById(id)
//     //responding with a template
//     if(!product){
//         throw new AppError(404, "Product not found")
//     }
//     res.render('products/detail', { product })
// })


// app.get('/products/:id/edit', async (req, res) => {
//     const { id } = req.params
//     const product = await Product.findById(id)
//     res.render('products/edit', { product, categories })
// })

// //the form sent a post request to this url.
// app.post('/products', async (req, res, next) => {
//     try{
//         const newProduct = new Product(req.body)
//         await newProduct.save()
//         res.redirect(`/products/${newProduct._id}`)
//     }
//     catch(e){
//         next(e)
//     }
// })

// //Put request is used to replace the whole product
// //Patch request is used to change a portion of the product
// app.put('/products/:id', async (req, res) => {
//     const { id } = req.params
//     const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
//     res.redirect(`/products/${product._id}`)
// })

// app.delete('/products/:id', async (req, res) => {
//     const { id } = req.params
//     const deletedProduct = await Product.findByIdAndDelete(id)
//     res.redirect(`/products`)
// })

/** ============================================================================== */
//This allows us to log the error to our console AND let express handle the error

app.use((err, req, res, next)=>{
    console.log(err.name)
    if(err.name === 'ValidationError')
        console.log('You need to type in the correct type of data')
    const {status = 500, message = "Something went wrong"} = err
    res.status(status).send(message)
})

app.listen(8080, () => {
    console.log('FARM STAND APP LISTENING on PORT 8080!')
})