/* ----------------------------XHR method-------------------------------------- */
// let req = new XMLHttpRequest()

// req.onload = function (){
//     const data = JSON.parse(this.responseText);
//     console.log
// }

// req.onerror = function(err){
//     console.log('ERROR', err)
// }

// req.open('GET','https://icanhazdadjoke.com/', true)
// req.setRequestHeader('Accept', 'application/json')
// req.send()

/* ----------------------------FETCH API-------------------------------------- */
// fetch('https://swapi.dev/api/people/1/')
// .then(res =>{
//     console.log('RESOLVED!',res) //returns the response
//     return res.json() //return promise object
// })
// .then(data =>{
//     console.log('Here is your JSON data', data)
//     return fetch('https://swapi.dev/api/people/2/')
// })
// .then(res=>{
//     return res.json()
// })
// .then(data=>{
//     console.log('Here is your second data', data)
// })
// .catch(err=>{
//     console.log('ERROR!!',err)
// })
/* ----------------------------Async function using Fetch-------------------------------------- */
// const loadStarWarPeople = async ()=>{
//     const res = await fetch('https://swapi.dev/api/people/1/')
//     const data = await res.json()
//     console.log(data)
// }
// loadStarWarPeople()
/* ----------Axios---------- */
// axios.get('https://swapi.dev/api/people/1/')
// .then(res=>{
//     console.log('HERE IS YOUR DATA!!', res)
// })
// .catch(err=>{
//     console.log('ERROR!!!', err)
// })
/* ----------------------------Async function using Axios-------------------------------------- */
// const getStartWarPerson = async (id)=>{
//     try{
//         const res = await axios.get(`https://swapi.dev/api/people/${id}/`)
//         console.log(res.data)
//     }
//     catch(e){
//         console.log("ERROR!!", e)
//     }
// }
// getStartWarPerson()
/* ----------------------------Setting headers with Axios-------------------------------------- */
const getDadJoke = async ()=>{
    try{
        const config = {headers: {Accept: 'application/json'}}
        const res = await axios.get(`https://icanhazdadjoke.com/`, config)
        console.log(res.data)
    }
    catch(e){
        console.log("ERROR!!", e)
    }
}
getDadJoke()

