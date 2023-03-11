h2 = document.querySelector('.title');

h2.append('Added content')

btn = document.querySelector(".button")

btn.onclick = function(){
    console.log("you clicked me")
}

function speak(){
    console.log('I spoke to you')
}

function shout(){
    console.log('AHHHHHHH')
}

btn.onclick = speak
btn.onclick = shout

btn.addEventListener('click', speak)
btn.addEventListener('click', shout)

document.addEventListener('click', function(e){
    alert("you clicked!!!");
    //This stops the bubbling effect
    e.stopPropagation();
})

const form = document.querySelector(".form")
form.addEventListener("input", function (e){
    console.log(e)
})

const ul = document.querySelector(ul)
ul.addEventListener('click', function(e){
    if(e.target.nodeName === 'li')
        e.target.remove()
})