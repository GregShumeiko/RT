function start(request) {
	console.log("Request handler 'start' was called.");
	return "Hello Start";
}

function upload(request) {
	console.log("Request handler 'upload' was called.");
  
	var body = "";
    
    request.on('data', function (chunk) {
    	body += chunk;
    });

    request.on('end', function () {
		// console.log('body: ' + body);

		// var jsonObj = JSON.parse(body);
		// console.log(jsonObj.$key);

		var fs = require('fs');
		fs.writeFile("data/src/regressionTable.json", body, function(err) {
	
		if(err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	  }); 

    })

    return "Upload successful";
}

exports.start = start;
exports.upload = upload;
