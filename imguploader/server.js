var http = require("http");
var url = require("url");


function startHTTPServer(route, handlerRegistry) {

	function onRequest(request, response){		
		var postData = "";

		var pathName = url.parse(request.url).pathname;
		//console.log("URL " + pathName + " requested");
		if( pathName == '/favicon.ico')
			return;

		/*var chunkNbr = 0;
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk; //keep concatinating the data
			//console.log(" **** Recieved chunk " + (++chunkNbr) + ": " + postDataChunk);
		});

		request.addListener("end", function(){
			console.log(" ** Recieving chunk ended (" + chunkNbr + "), proceeding to process request now ** ");
			route(handlerRegistry, pathName, response, postData);
		});*/

		route(handlerRegistry, pathName, response, request);

		/*response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Thanks for the request");
		response.end();*/
	}	

	//Can have multiple createserver statements, each at different ports
	http.createServer(onRequest).listen(9090);
	console.log("server running...!");
}

exports.startHTTPServer = startHTTPServer;