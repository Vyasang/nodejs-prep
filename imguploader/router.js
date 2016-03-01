//function route(handlerRegistry, pathName, response, postData) {
function route(handlerRegistry, pathName, response, request) {
	console.log("About to route request : " + pathName);

	/*for(handler in handlerRegistry) {
		console.log(handler + ":" + handlerRegistry[handler]);
	}*/

	if (typeof handlerRegistry[pathName] === 'function') {
		//handlerRegistry[pathName](response, postData);
		handlerRegistry[pathName](response, request);
	} else {
		console.log("No request handler mapped for request: " + pathName);

		response.writeHead(404, {"Content-Type":"text/html"});
		response.write("404 page not found...!");
		response.end();
	}
}

exports.route = route;