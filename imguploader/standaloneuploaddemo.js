var formidable = require('formidable');
var http = require('http');
var sys = require('sys');

http.createServer(function(req, res) {
	//If Upload form is submitted as a post request, process it
	if(req.url == '/upload' && req.method.toLowerCase() == 'post') {
		var form = new formidable.IncomingForm();
		form.parse(req, function(error, fields, files) {
			res.writeHead(200, {'Content-Type' : 'text/plain'});
			res.write('recieved upload:\n\n');
			res.end(sys.inspect({fields: fields, files: files}));
		});
		return;
	}

	//If upload form is not submitted, Show the form
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.end(
		  '<form action="/upload" enctype="multipart/form-data" method="post">' 
		+ 	'<input type="text" name="title"><br>'
		+ 	'<input type="file" name="upload" multiple="multiple"><br>'
		+ 	'<input type="submit" value="Upload">'
		+ '</form<'
	);	
}).listen(8888);