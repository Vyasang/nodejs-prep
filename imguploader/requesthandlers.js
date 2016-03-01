var queryString = require("querystring");
var exec = require("child_process").exec;
var fs = require("fs");
var formidable = require('formidable');

function index(response, postData) {
	console.log("Request index is being processed");

	var body = '<html>' + 
	'<head>' +
	'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
	'</head>' +
	'<body>' +
	'<form action="/upload" method="post">' +
	'<textarea name="text" rows="20" cols="60"></textarea>' +
	'<input type="Submit" value="Submit Text" />' +
	'</form>' +
	'</body>' +
	'<head>' +
	'<html>';

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
}

function start(response, postData) {
	console.log("Request start server is being processed");

	/*function sleep(milliseconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliseconds) {
			; //do nothing
		}		
	} //end of sleep 

	sleep(10000);*/

	exec ("ls -lah"
		, { timeout: 10000, maxBuffer: 20000*1024 }
		, function(error, stdout, stderr) { content = stdout; 
		response.writeHead(200, {"Content-Type" : "text/plain"});
		response.write(stdout);
		response.end();
	});
	
}

function upload(response, postData) {
	console.log("Request to upload image is being processed");

	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("You have submitted: " + queryString.parse(postData).text);
	response.end();
}

//function imageUpload(response, postData) {
function imageUpload(response, request) {
	console.log("Request image upload form requested passed");

	var body = '<html>' + 
	'<head>' +
	'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
	'</head>' +
	'<body>' +
	'<form action="/submitImageUpload" enctype="multipart/form-data" method="post">' +
	'<input type="file" name="upload" />' +
	'<input type="submit" value="Upload File" />' +
	'</form>' +
	'</body>' +
	'<head>' +
	'<html>';

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
}

function submitImageUpload(response, request) {
	console.log("Request handler 'upload image' was called");

	var form = new formidable.IncomingForm();
	console.log("about to parse image upload form");

	form.parse(request, function(error, fields, files){
		console.log("image upload form pasrsing done..!");

		fs.rename(files.upload.path, "tmp/test.png", function(error) {
			if(error) {
				//if file already exist, unlink (remove) existing and move latest one
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path, "/tmp/test.png");				
			}
		});

		response.writeHead(200, {"Content-Type" : "text/html"});
		response.write("recieved image:<br/>");
		response.write("<img src='/imageShow' />");
		response.end();

	});
}

//function imageShow(response, postData) {
function imageShow(response, request) {
	console.log("Request handler 'show' was called");
	fs.readFile("/tmp/test.png", "binary", function(error, file){
		if (error) {
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type" : "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.index = index;
exports.start = start;
exports.upload = upload;
exports.imageUpload = imageUpload;
exports.submitImageUpload = submitImageUpload;
exports.imageShow = imageShow;