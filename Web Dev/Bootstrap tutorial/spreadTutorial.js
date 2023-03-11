//empty object
let person = {}
//an object with information
let animal = {
    name: "Snoopy",
    age: 3,
    isAdopted: true
}

//finds the maximum
Math.max(1,4,6,62345,763,2,34,632,324,51,345)

//Math.max does not work with arrays
arr = [1,4,6,62345,763,2,34,632,324,51,345]
Math.max(arr)

let cats = ["cat1","cat2","cat3"]
let dogs = ["dog1","dog2","dog3","dog4"]
let animals = [...cats,...dogs]

let canine = {
    family: "canine",
    type: "carnivors"
}

let number = 0

while(number < 100){
    //this exit out of the loop
    if(number == 50){
        break;
    }
    number++
}

let wolf = {
    ...canine,
    species: "wolf",
    loyaltyPercent: 0.95
}

for(let i = 1; i <= 10; i++){
    console.log(i)
}

let nums = [1,5,6,8,2]
//starts at index 0, then loop over each element
for(number of nums){
    console.log(number)
}

//adds all the numbers together
function sum(...nums){
    return nums.reduce((total, num)=> total + num)
}

function giveMedal(gold, silver, bronze, ...everyoneElse){
    console.log(`the gold medal goes to ${gold}`)
    console.log(`the silver medal goes to ${silver}`)
    console.log(`the bronze medal goes to ${bronze}`)
    console.log(`the participation reward goes to ${everyoneElse}`)
}


console.log(`You bought ${numChicken} chickens for ${numChicken * unitPrice} dollars` )