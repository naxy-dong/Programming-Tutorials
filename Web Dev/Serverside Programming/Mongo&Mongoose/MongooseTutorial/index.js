const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log("connected!!")
    })
    .catch(err => {
        console.log("it failed!!", err)
    })

//Blueprint for a model
const movieSchema = new mongoose.Schema({
    title: { type: String },
    year: { type: Number },
    rating: { type: Number },
    isOver18: { type: Boolean }
})



//creating a class called Movie in Javascript
//The mongo database will create a collection call 'movies'
//mongo will pluralize the term 'Movie' and make it lowercase
const Movie = mongoose.model('Movie', movieSchema)

//creating an instance of a movie in Javascript
// const Thor = new Movie({ title:"Thor: Love and Thunder", year:2022, rating:9.8, isOver18:false},)
//Thor.save
Movie.insertMany([
    { title: "Avatar", year: 2009, rating: 9.3, isOver18: false },
    { title: "Intersteller", year: 2014, rating: 8.6, isOver18: true },
    { title: "Game of Thrones", year: 2011, rating: 9.5, isOver18: true },
    { title: "I'm a legend", year: 2007, rating: 7.2, isOver18: true }
])
    .then((data) => {
        console.log("These movies are saved!!!", data)
    })
    .catch(err => {
        console.log('it failed', err)
    })