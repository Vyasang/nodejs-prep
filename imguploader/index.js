
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requesthandlers");

var handle = {};
handle["/"] = requestHandlers.index;
handle["/index"] = requestHandlers.index;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/test"] = requestHandlers.test;
handle["/imageUpload"] = requestHandlers.imageUpload;
handle["/submitImageUpload"] = requestHandlers.submitImageUpload;
handle["/imageShow"] = requestHandlers.imageShow;

server.startHTTPServer(router.route, handle);

