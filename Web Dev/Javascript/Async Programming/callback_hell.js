console.log("Program Started");
//********This gets the user data, but can't manipulate user data in anyway. A callback function is needed********//
// function getUserLogin(email, password){
//     setTimeout(() => {
//         console.([logemail,password]);
//         return[email,password];
//     }, 2000);
// }
// getUserLogin("yuxiang@gmail.com", "12345123");

function getUserLogin(email, password, callback){
    setTimeout(() => {
        callback("User email is " + email + " and user password is " + password);
        //This is where you get the data
    }, 2000);
}

function getUserVideo(videos, callback){
    setTimeout(()=>{
        callback("User's profile contains " + videos);
        //This is where you get the data
    },2000);
}

function getUserHistory(history, callback){
    setTimeout(() => {
        callback("User has watched " + history);
        //This is where you get the data
    }, 2000);
}
var user = getUserLogin("yuxiang@gmail.com", "12345123", getLogin =>{
    console.log(getLogin);
    //This is where you manipulate/consume the data
    getUserVideo("hey bye", getVideo =>{
        console.log(getVideo)
        getUserHistory("THE WORLD", getHistory =>{
            console.log(getHistory);
        });
    });
});
console.log("Program ended");

// As you can see, the more data we want to fetch, the more nested the loop is.
//It makes the program hard to understand and not even implemented error handlers
//, which makes to program more complicated