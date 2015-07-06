var exec = require("child_process").exec;
var queryString = require("querystring");
function start(response,postData) {
  console.log("Request handler 'start' was called.");

  exec("",function(error,stdout,stderr) {
    console.log("exec /");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"> </textarea>'+
    '</br>'+
    '</br>'+
    '</br>'+
    '</br>'+
    '<input type="submit" value="Submit text"/>'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();

  });
  // exec("find /",{timeout:10000,maxBuffer:20000*1024},function(error,stdout,stderr){
  //   response.writeHead(200,{"Content-Type":"text/plain"});
  //   response.write(stdout);
  //   response.end();
  // });
  // return content;

  // function newDate() {
  //   return new Date();
  // }
  // function sleep(milliSeconds) {
  //   var startTime = newDate().getTime();
  //   while newDate().getTime()<startTime+milliSeconds) {
  //
  //   }
  // }
  // sleep(10000);
  // return "Hello start!";
}
function upload(response,postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("You've sent: "+queryString.parse(postData).text);
    response.end();
}

exports.start = start;
exports.upload = upload;
