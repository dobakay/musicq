"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var cors = require("cors");
// import * as errorHandler from "errorHandler";
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
// import methodOverride = require("method-override");
// Routes
var IndexRoute_1 = require("./routes/IndexRoute");
var StreamTubeRoute_1 = require("./routes/StreamTubeRoute");
var SearchTubeRoute_1 = require("./routes/SearchTubeRoute");
var Server = /** @class */ (function () {
    /**
    * Constructor
    *
    * @class Server
    * @constructor
    */
    function Server() {
        // create expressjs application
        this.app = express();
        // configure application
        this.config();
        // add routes
        this.routes();
        // add api
        this.api();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    Server.prototype.api = function () {
        //empty for now
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    Server.prototype.config = function () {
        // add static paths
        this.app.use("/static", express.static(path.join(__dirname, "../www")));
        // NOTE: NOT NEEDED for now
        // configure pug template engine
        // this.app.set("views", path.join(__dirname, "../views"));
        // this.app.set("view engine", "pug");
        //use logger middleware
        this.app.use(logger("dev"));
        // enable CORS
        this.app.use(cors());
        //use json from parser middleware
        this.app.use(bodyParser.json());
        //use query string parser middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //use cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        //user override middleware
        this.app.use(methodOverride());
        //catch error 404 and forward to error errorhandler
        this.app.use(function (err, req, res, next) {
            // err.status = 404;
            console.log(err);
            res.status(500).send();
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /**
   * Create routes
   *
   * @class Server
   * @method routes
   * @return void
   */
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        // Routes init
        IndexRoute_1.IndexRoute.create(router); // /
        StreamTubeRoute_1.StreamTubeRoute.create(router); // /youtube-download/:videoID
        SearchTubeRoute_1.SearchTubeRoute.create(router); // /search-youtube/
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
/// <reference path="_all.d.ts" />

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUMvQixpQ0FBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDZCQUE2QjtRQUM3RCxpQ0FBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtRQUVuRCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQWhIQSxBQWdIQyxJQUFBO0FBaEhZLHdCQUFNO0FBa0huQixrQ0FBa0MiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcclxuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XHJcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0ICogYXMgbG9nZ2VyIGZyb20gXCJtb3JnYW5cIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG52YXIgY29ycyA9IHJlcXVpcmUoXCJjb3JzXCIpO1xyXG5cclxuLy8gaW1wb3J0ICogYXMgZXJyb3JIYW5kbGVyIGZyb20gXCJlcnJvckhhbmRsZXJcIjtcclxudmFyIGVycm9ySGFuZGxlciA9IHJlcXVpcmUoXCJlcnJvcmhhbmRsZXJcIik7XHJcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gXCJtZXRob2Qtb3ZlcnJpZGVcIjtcclxuLy8gaW1wb3J0IG1ldGhvZE92ZXJyaWRlID0gcmVxdWlyZShcIm1ldGhvZC1vdmVycmlkZVwiKTtcclxuXHJcbi8vIFJvdXRlc1xyXG5pbXBvcnQgeyBJbmRleFJvdXRlIH0gZnJvbSBcIi4vcm91dGVzL0luZGV4Um91dGVcIjtcclxuaW1wb3J0IHsgU3RyZWFtVHViZVJvdXRlIH0gZnJvbSBcIi4vcm91dGVzL1N0cmVhbVR1YmVSb3V0ZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hUdWJlUm91dGUgfSBmcm9tIFwiLi9yb3V0ZXMvU2VhcmNoVHViZVJvdXRlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyIHtcclxuXHJcblx0cHVibGljIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcclxuXHJcblx0LyoqXHJcblx0ICogQm9vdHN0cmFwIHRoZSBhcHBsaWNhdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcclxuXHQgKiBAbWV0aG9kIGJvb3RzdHJhcFxyXG5cdCAqIEBzdGF0aWNcclxuXHQgKiBAcmV0dXJuIHtuZy5hdXRvLklJbmplY3RvclNlcnZpY2V9IFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQgaW5qZWN0b3IgZm9yIHRoaXMgYXBwLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgYm9vdHN0cmFwKCk6IFNlcnZlciB7XHJcblx0XHRyZXR1cm4gbmV3IFNlcnZlcigpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KiBDb25zdHJ1Y3RvclxyXG5cdCpcclxuXHQqIEBjbGFzcyBTZXJ2ZXJcclxuXHQqIEBjb25zdHJ1Y3RvclxyXG5cdCovXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvLyBjcmVhdGUgZXhwcmVzc2pzIGFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLmFwcCA9IGV4cHJlc3MoKTtcclxuXHJcblx0XHQvLyBjb25maWd1cmUgYXBwbGljYXRpb25cclxuXHRcdHRoaXMuY29uZmlnKCk7XHJcblxyXG5cdFx0Ly8gYWRkIHJvdXRlc1xyXG5cdFx0dGhpcy5yb3V0ZXMoKTtcclxuXHJcblx0XHQvLyBhZGQgYXBpXHJcblx0XHR0aGlzLmFwaSgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIFJFU1QgQVBJIHJvdXRlc1xyXG5cdCAqXHJcblx0ICogQGNsYXNzIFNlcnZlclxyXG5cdCAqIEBtZXRob2QgYXBpXHJcblx0ICovXHJcblx0cHVibGljIGFwaSgpIHtcclxuXHRcdC8vZW1wdHkgZm9yIG5vd1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29uZmlndXJlIGFwcGxpY2F0aW9uXHJcblx0ICpcclxuXHQgKiBAY2xhc3MgU2VydmVyXHJcblx0ICogQG1ldGhvZCBjb25maWdcclxuXHQgKi9cclxuXHRwdWJsaWMgY29uZmlnKCkge1xyXG5cclxuXHRcdC8vIGFkZCBzdGF0aWMgcGF0aHNcclxuXHRcdHRoaXMuYXBwLnVzZShcIi9zdGF0aWNcIiwgZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi93d3dcIikpKTtcclxuXHJcblx0XHQvLyBOT1RFOiBOT1QgTkVFREVEIGZvciBub3dcclxuXHRcdC8vIGNvbmZpZ3VyZSBwdWcgdGVtcGxhdGUgZW5naW5lXHJcblx0XHQvLyB0aGlzLmFwcC5zZXQoXCJ2aWV3c1wiLCBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL3ZpZXdzXCIpKTtcclxuXHRcdC8vIHRoaXMuYXBwLnNldChcInZpZXcgZW5naW5lXCIsIFwicHVnXCIpO1xyXG5cclxuXHRcdC8vdXNlIGxvZ2dlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UobG9nZ2VyKFwiZGV2XCIpKTtcclxuXHJcblx0XHQvLyBlbmFibGUgQ09SU1xyXG5cdFx0dGhpcy5hcHAudXNlKGNvcnMoKSk7XHJcblxyXG5cdFx0Ly91c2UganNvbiBmcm9tIHBhcnNlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxuXHRcdC8vdXNlIHF1ZXJ5IHN0cmluZyBwYXJzZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7ZXh0ZW5kZWQ6IHRydWV9KSk7XHJcblxyXG5cdFx0Ly91c2UgY29va2llIHBhcnNlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UoY29va2llUGFyc2VyKFwiU0VDUkVUX0dPRVNfSEVSRVwiKSk7XHJcblxyXG5cdFx0Ly91c2VyIG92ZXJyaWRlIG1pZGRsZXdhcmVcclxuXHRcdHRoaXMuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcclxuXHJcblx0XHQvL2NhdGNoIGVycm9yIDQwNCBhbmQgZm9yd2FyZCB0byBlcnJvciBlcnJvcmhhbmRsZXJcclxuXHRcdHRoaXMuYXBwLnVzZSgoZXJyOiBhbnksIHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcblx0XHRcdC8vIGVyci5zdGF0dXMgPSA0MDQ7XHJcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdHJlcy5zdGF0dXMoNTAwKS5zZW5kKCk7XHJcblx0XHRcdG5leHQoZXJyKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vZXJyb3IgaGFuZGxpbmdcclxuXHRcdHRoaXMuYXBwLnVzZShlcnJvckhhbmRsZXIoKSk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICogQ3JlYXRlIHJvdXRlc1xyXG4gICAqXHJcbiAgICogQGNsYXNzIFNlcnZlclxyXG4gICAqIEBtZXRob2Qgcm91dGVzXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcblx0cHVibGljIHJvdXRlcygpIHtcclxuXHRcdGxldCByb3V0ZXI6IGV4cHJlc3MuUm91dGVyO1xyXG5cdFx0cm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcblx0XHQvLyBSb3V0ZXMgaW5pdFxyXG5cdFx0SW5kZXhSb3V0ZS5jcmVhdGUocm91dGVyKTsgLy8gL1xyXG5cdFx0U3RyZWFtVHViZVJvdXRlLmNyZWF0ZShyb3V0ZXIpOyAvLyAveW91dHViZS1kb3dubG9hZC86dmlkZW9JRFxyXG5cdFx0U2VhcmNoVHViZVJvdXRlLmNyZWF0ZShyb3V0ZXIpO1x0Ly8gL3NlYXJjaC15b3V0dWJlL1xyXG5cclxuXHRcdC8vdXNlIHJvdXRlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2Uocm91dGVyKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfYWxsLmQudHNcIiAvPiJdLCJzb3VyY2VSb290IjoiLi5cXHNyYyJ9
