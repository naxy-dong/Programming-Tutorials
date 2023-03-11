const pets = require('./Pets')
console.log(pets)

var colors = require('colors')
var jokes = require('give-me-a-joke')

//This does not work, node can't find cowsay
//because it's global
const cowsay = require('cowsay')
console.log(cowsay)