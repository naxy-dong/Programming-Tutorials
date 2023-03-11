//resolve : get the data successfully
//reject : failed to get the data
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("You get the data back boi");
    }, 2000);
});

//time to process/consume the data
//.then is used when the data is received successfully
//.catch is used when handling errors
//.finnaly is used when 
promise.then(fun => {
    console.log(fun);
});

// fakePromiseObject('yelp.com/page1')
//     .then(() => {
//         console.log('it worked for page 1')
//         fakePromiseObject('yelp.com/page2')
//             .then(() => {
//                 console.log('it worked for page2 as well')
//                 fakePromiseObject('yelp.com/page3')
//                 .then(() => {
//                     console.log('it worked for page3 as well')
//                 })
//                 .catch(() => {
//                     console.log('page3 rejected')
//                 })
//             })
//             .catch(() => {
//                 console.log('page2 rejected')
//             })
//     })
//     .catch(()=>{
//         console.log('page1 rejected')
//     })

fakePromiseObject('yelp.com/page1')
    .then(() => {
        console.log('it worked for page 1')
        return fakePromiseObject('yelp.com/page2')
    })
    .then(() => {
        console.log('it worked for page2 as well')
        return fakePromiseObject('yelp.com/page3')
    })
    .then(() => {
        console.log('it worked for page3 as well')
    })
    .catch(() => {
        console.log('a page has been rejected')
    })


const fakePromiseObject = (url) =>{
    return new Promise((resolve, reject) => {
        const rand = Math.random()
        setTimeout(() => {
            if(rand < 0.6){
                resolve('success!!!')
            }
            reject('request error')
        },1000)
    })
}

//resolved
async function hello(){
    return 'hello'
}
//rejected
async function bad(){
    throw new Error("An error!!")
}
//arrow function
const draw = async ()=>{
    return 'I drew a bird'
}

const login = async function(username, password){
    //if the username or the password does not exist
    if(!username || !password)
        throw 'missing credentials'
    //if the password is 'hello'
    if(password == 'hello')
        return 'welcome'
    throw 'invalid password'
}

login("heljsdf", 'klsadjf')
    .then(msg => {
        console.log(msg)
    })
    .catch(err => {
        console.log(err)
    })

fakeRequest = (url) =>{
    return new Promise((resolve, reject) =>{
        const delay = Math.floor(Math.random() * 4500) + 500
        if(delay > 4000){
            reject('time out error') //this will throw an error
        }else{
            resolve(`sucess!! your here is your data from ${url}`)
        }
    })
}

// async function makeRequest(){
//     let data1 = await fakeRequest('page/1') //throw success or error
//     console.log(data1)
// }

async function makeRequest(){
    try{
        let data1 = await fakeRequest('page/1') //throw success or error
        console.log(data1)
    }
    catch(e){
        console.log(`An error occured, but it's alright`)
    }
}

