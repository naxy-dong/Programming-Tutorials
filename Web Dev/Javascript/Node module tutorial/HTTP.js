var http = require("http");

// http.createServer creates an object/server. That's the only thing you should know
var server = http.createServer(function (request, response)
{
    // remember: request and response are objects that has its methods and properties

    /*
        request: 
            234
            234
            234
            234
        response:
            response.write(input)     // simply outputs the input onto the page
            response.writeHead(status, {contentType: type/extension}) 
             // more advanced way to write on the page,
              it can check for errs and act accordingly 
            response.end(optional input) //tells the server to stop putting stuff onto the page!
            response.setHeader
    
    */ 
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("Hello World\n");
});
// the server object has .listen method, which just listens to any user that access the server.
server.listen(8081, () => {
    console.log("Server is running at http://127.0.0.1:8081/")
});