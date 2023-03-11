const url = require('url');
//check all methods of url
//console.log(url)

const example =  "http://localhost:8081/user?country=America&city=NY";

//Url.parse gives back an url object. You can access parse of url using the built-in methods inside the object
const urlObject = url.parse(example, true);

//here is some property you can access.
console.log(urlObject.host); //    localhost:8081
console.log(urlObject.pathname); //   /user
console.log(urlObject.search); //    ?country=America&city=NY

// you can even access the properties inside the search
const queryData = urlObject.query;  //   {country: America, city: NY}
console.log(queryData.country);    // Americac
console.log(queryData.city);    // NYs