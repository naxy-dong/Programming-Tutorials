Array.prototype.yell = function(){
    console.log(`HELLO!!!${this}!!!!!`.toUpperCase)
}


let probability = 7.15112384 * Math.pow(10,-8)
let timeForConsideration = 10 * 1000
function hmmmShouldISentToePic(){
    let randomNumber = Math.random()
    //place an equal sign for a little more chance
    if(randomNumber <= probability){
        console.log("WOW!!! Here is your toe pic")
        return
    }
    else{
        console.log(`AWWWW, your random number is ${randomNumber}. So close!!!`)
        setTimeout(hmmmShouldISentToePic, timeForConsideration);
    }
}