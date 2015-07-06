var http = require("http");
var url = require("url");

function start(route,handle){
  function onRequest(request, response) {
    var postData="";
    console.log("Request received");
    var pathname = url.parse(request.url).pathname;
    console.log("Request fo r" + pathname +" received.");
    route(pathname,handle,response,request);
    // request.setEncoding("utf8");
    // request.addListener("data",function(postDataChunk) {
    //   // called when a new chunk of data was received
    //   console.log("called when a new chunk of data was received");
    //   console.log(postDataChunk);
    //   postData += postDataChunk;
    //   console.log("Received POST data chunk"+postDataChunk+".");
    // });
    // request.addListener("end",function() {
    //   // called when all chunks of data have been received
    //   console.log("called when all chunks of data have been received");
    //   route(pathname,handle,response,postData);
    // });

    // response.writeHead(200,{"Content-Type":"text/plain"});
    // response.write(content);
    // response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;


// http.createServer(function(request, response) {
//   response.writeHead(200,{"Content-Type":"text/plain"});
//   response.write("Hello World, JACK WONG!");
//   response.end();
// }).listen(8888);

// function say(world){
//   console.log(world);
// }
//
// function execute(someFunction, value) {
//   someFunction(value);
// }
//
// execute(say,"hello");
