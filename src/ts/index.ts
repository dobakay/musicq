var debug = require("debug")("express:server");
var http = require("http");
var serverModule = require("./App");

//get port from environment and store in Express.
var port = normalizePort(process.env.PORT || 8080);
var app = serverModule.Server.bootstrap().app;
app.set("port", port);

// create http server
var server = http.createServer(app);

// listen on provided ports
server.listen(port);

// add error handler
server.on("error", onError);

// start listening on port
server.on("listening", onListening);

function normalizePort(val: any) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var  bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + "requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            console.log(error);
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
}
