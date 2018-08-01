"use strict";
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
function normalizePort(val) {
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
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string"
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDL0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVwQyxpREFBaUQ7QUFDakQsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQ25ELElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQzlDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXRCLHFCQUFxQjtBQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXBDLDJCQUEyQjtBQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXBCLG9CQUFvQjtBQUNwQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUU1QiwwQkFBMEI7QUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFHcEMsdUJBQXVCLEdBQVE7SUFDM0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUU3QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNiLGFBQWE7UUFDYixPQUFPLEdBQUcsQ0FBQztLQUNkO0lBRUQsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1FBQ1gsY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBR0Q7O0dBRUc7QUFDSCxpQkFBaUIsS0FBVTtJQUN2QixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzVCLE1BQU0sS0FBSyxDQUFDO0tBQ2Y7SUFFRCxJQUFLLElBQUksR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRO1FBQ2hDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSTtRQUNoQixDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUVyQix1REFBdUQ7SUFDdkQsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1FBQ2hCLEtBQUssUUFBUTtZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLDhCQUE4QixDQUFDLENBQUM7WUFDckQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNO1FBQ1YsS0FBSyxZQUFZO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU07UUFDVjtZQUNJLE1BQU0sS0FBSyxDQUFDO0tBQ25CO0FBQ0wsQ0FBQztBQUVEOztHQUVHO0FBQ0g7SUFDSSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxJQUFJLEtBQUssUUFBUTtRQUMvQixDQUFDLENBQUMsT0FBTyxHQUFHLElBQUk7UUFDaEIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzFCLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcImV4cHJlc3M6c2VydmVyXCIpO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG52YXIgc2VydmVyTW9kdWxlID0gcmVxdWlyZShcIi4vQXBwXCIpO1xyXG5cclxuLy9nZXQgcG9ydCBmcm9tIGVudmlyb25tZW50IGFuZCBzdG9yZSBpbiBFeHByZXNzLlxyXG52YXIgcG9ydCA9IG5vcm1hbGl6ZVBvcnQocHJvY2Vzcy5lbnYuUE9SVCB8fCA4MDgwKTtcclxudmFyIGFwcCA9IHNlcnZlck1vZHVsZS5TZXJ2ZXIuYm9vdHN0cmFwKCkuYXBwO1xyXG5hcHAuc2V0KFwicG9ydFwiLCBwb3J0KTtcclxuXHJcbi8vIGNyZWF0ZSBodHRwIHNlcnZlclxyXG52YXIgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcclxuXHJcbi8vIGxpc3RlbiBvbiBwcm92aWRlZCBwb3J0c1xyXG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xyXG5cclxuLy8gYWRkIGVycm9yIGhhbmRsZXJcclxuc2VydmVyLm9uKFwiZXJyb3JcIiwgb25FcnJvcik7XHJcblxyXG4vLyBzdGFydCBsaXN0ZW5pbmcgb24gcG9ydFxyXG5zZXJ2ZXIub24oXCJsaXN0ZW5pbmdcIiwgb25MaXN0ZW5pbmcpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZVBvcnQodmFsOiBhbnkpIHtcclxuICAgIHZhciBwb3J0ID0gcGFyc2VJbnQodmFsLCAxMCk7XHJcblxyXG4gICAgaWYgKGlzTmFOKHBvcnQpKSB7XHJcbiAgICAgICAgLy8gbmFtZWQgcGlwZVxyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBvcnQgPj0gMCkge1xyXG4gICAgICAgIC8vIHBvcnQgbnVtYmVyXHJcbiAgICAgICAgcmV0dXJuIHBvcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEV2ZW50IGxpc3RlbmVyIGZvciBIVFRQIHNlcnZlciBcImVycm9yXCIgZXZlbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBvbkVycm9yKGVycm9yOiBhbnkpIHtcclxuICAgIGlmIChlcnJvci5zeXNjYWxsICE9PSBcImxpc3RlblwiKSB7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyICBiaW5kID0gdHlwZW9mIHBvcnQgPT09IFwic3RyaW5nXCJcclxuICAgICAgICA/IFwiUGlwZSBcIiArIHBvcnRcclxuICAgICAgICA6IFwiUG9ydCBcIiArIHBvcnQ7XHJcblxyXG4gICAgLy8gaGFuZGxlIHNwZWNpZmljIGxpc3RlbiBlcnJvcnMgd2l0aCBmcmllbmRseSBtZXNzYWdlc1xyXG4gICAgc3dpdGNoIChlcnJvci5jb2RlKSB7XHJcbiAgICAgICAgY2FzZSBcIkVBQ0NFU1wiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGJpbmQgKyBcInJlcXVpcmVzIGVsZXZhdGVkIHByaXZpbGVnZXNcIik7XHJcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkVBRERSSU5VU0VcIjpcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgXCIgaXMgYWxyZWFkeSBpbiB1c2VcIik7XHJcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFdmVudCBsaXN0ZW5lciBmb3IgSFRUUCBzZXJ2ZXIgXCJsaXN0ZW5pbmdcIiBldmVudC5cclxuICovXHJcbmZ1bmN0aW9uIG9uTGlzdGVuaW5nKCkge1xyXG4gICAgdmFyIGFkZHIgPSBzZXJ2ZXIuYWRkcmVzcygpO1xyXG4gICAgdmFyIGJpbmQgPSB0eXBlb2YgYWRkciA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgID8gXCJwaXBlIFwiICsgYWRkclxyXG4gICAgICAgIDogXCJwb3J0IFwiICsgYWRkci5wb3J0O1xyXG4gICAgZGVidWcoXCJMaXN0ZW5pbmcgb24gXCIgKyBiaW5kKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii4uXFxzcmMifQ==
