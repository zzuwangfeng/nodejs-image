var queryString = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable"),
  exec = require("child_process").exec;
function start(response) {
  console.log("Request handler 'start' was called.");
  exec("",function(error,stdout,stderr) {
    // console.log("exec /");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    // '<textarea name="text" rows="20" cols="60"> </textarea>'+
    '</br>'+
    '</br>'+
    '</br>'+
    '</br>'+
    '<input type="file" name="upload"/>'+
    '<input type="submit" value="upload file"/>'+
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
function upload(response,request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request,function(error,fields,files){
    fs.rename(files.upload.path,"/tmp/test.png",function(err){
      if (err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />")
    response.end();
  });


}

function show(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200,{"Content-Type":"image/png"});
  fs.createReadStream("/tmp/test.png").pipe(response);
  // fs.readFile("/tmp/test.png","binary",function(error, file) {
  //   if (error) {
  //     response.writeHead(500,{"Content-Type":"text/plain"});
  //     response.write(error+"\n");
  //     response.end();
  //   }else {
  //     response.write(200,{"Content-Type":"image/png"});
  //     response.write(file,"binary");
  //     response.end();
  //   }
  // });
}
exports.start = start;
exports.upload = upload;
exports.show = show;
