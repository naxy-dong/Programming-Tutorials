console.log("Program Started");
//********This gets the user data, but can't manipulate user data in anyway. A callback function is needed********//
// function getUserLogin(email, password){
//     setTimeout(() => {
//         console.log([email,password]);
//         return[email,password];
//     }, 2000);
// }
// getUserLogin("yuxiang@gmail.com", "12345123");

function getUserLogin(email, password){
    let promise = new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve("User email is " + email + " and user password is " + password);
            //This is where you get the data
        }, 2000);
    });
}

function getUserVideo(videos){
    let promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("User's profile contains " + videos);
            //This is where you get the data
        },2000);
    });
}

function getUserHistory(history){
    let promise = new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve("User has watched " + history);
            //This is where you get the data
        }, 2000);
    })
}

getUserLogin("myEmail", "nani")
    .then(user =>  getUserVideo("myVid"))
    .then(history => getUserHistory("myHistory"))
    .then(detail => console.log(detail));

console.log("Program ended");