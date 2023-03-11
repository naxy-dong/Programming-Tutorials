const express = require('express')
const app = express()
const path = require('path')

const cookieParser = require('cookie-parser')
app.use(cookieParser('THIS IS MY SECRET KEY'))

const session = require('express-session')
const sessionOption = { secret: 'THIS IS A VERY BAD SECRET', resave: false, saveUninitialized: false }
app.use(session(sessionOption))

//we will tell how many times user have view a page
app.get('/viewcount', (req, res) => {
    res.send("you've viewed this page X times")
})

//use express middleware to serve the files
app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/r/:subreddit', (req, res) => {
    console.log(req.params)
    //destructuring
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit })
})

app.get('/cats', (req, res) => {
    res.cookie('name', 'Naxy Dong')
    const { name } = req.cookies
    res.send(`meow, and feed me plz ${name}`)
})

app.get('/signingCookies', (req, res) => {
    res.cookie('age', 18, { signed: true })
    const { age } = req.signedCookies
    res.send('woof' + age)
})

app.get('/dogs', (req, res) => {
    res.send('woof')
})

app.get('/rand', (req, res) => {
    let num = Math.floor(Math.random() * 10) + 1
    res.render('rand', { randomNum: num })
})


//3000 is the server port. A port is like an address of a website.
app.listen(3000, () => {
    console.log('the server is up running on Port 3000')
})


// app.use((req, res) => {
//     console.log('WE GOT A REQUEST!!!')
//     //generates a HTTP resquest
//     res.send('We got your response!!')
//     res.send({color:'red'})
//     res.send('<h1>This is my big text!</h1>')
// })

// database =
// {
//     id: 3,
//     shoppingCart: [
//         { item: "lime", pty: 1 },
//         { item: "banana", pty: 3 },
//         { item: "grapes", pty: 2 }
//     ]
// },
// {
//     id: 4,
//     shoppingCart: [
//         { item: "wok", pty: 2 },
//         { item: "induction stove", pty: 1 },
//         { item: "cleaver", pty: 2 }
//     ]
// }

