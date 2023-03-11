const http = require("http");

http.createServer(function(request,response){
    response.write("When console.log the request object, the information inside it will overwhelm you. " +
    "the request object has a lot of properties and contains a lot of functions");
    console.dir(request, {depth:0});
    // console.dir(response, {depth:0});
    /*console.dir goes through the tree of the request object,
        {depth:0} picks out the first level of the request object.
    */
    response.end();
}).listen(8081);

console.log("it's running");