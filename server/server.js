var http = require('http');
var static = require('node-static');

var http = require("http");
var url = require("url");

var path = require("path");
var fs = require("fs");

function start(route, handle) {
  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname;

    if (pathname.startsWith('/data/')){

      console.log("About to file a request for " + pathname);

      var uri = url.parse(request.url).pathname, filename = path.join(process.cwd(), uri);

      fs.exists(filename, function(exists) {
        
        if(!exists) {
          response.writeHead(404, {"Content-Type": "text/plain"});
          response.write("404 Not Found\n");
          response.end();
          return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
          if(err) {        
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            return;
          }

          response.writeHead(200);
          response.write(file, "binary");
          response.end();
        });
      });


    } else {
      var content = route(handle, pathname, request, response)
      
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(content);
      response.end();
    }
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
