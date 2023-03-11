/* two outcomes:
it's either the user enter all correct formatting of the input
or the user entered at least one wrong input.
*/

function processingData(data){
    // if(data.phoneNum.search(/\D/g) != -1)
    //     alert("Invalid phone number");
    if(data.phoneNum.match(/\d{3}\d{3}\d{4}/g) == -1)
        alert("Invalid phone number");
    phoneNumber = data.phoneNum.match(/\d{3}[ -]?\d{3}[ -]?\d{4}/g);
    console.log()
}