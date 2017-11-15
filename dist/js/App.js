"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
// import * as errorHandler from "errorHandler";
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
// import methodOverride = require("method-override");
// Routes
var IndexRoute_1 = require("./routes/IndexRoute");
var DownloadTubeRoute_1 = require("./routes/DownloadTubeRoute");
// D: \Projects\MM\musicq\src\scripts\IndexRoute.ts
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
        this.app.use('/static', express.static(path.join(__dirname, '../www')));
        // NOTE: NOT NEEDED for now
        // configure pug template engine
        // this.app.set("views", path.join(__dirname, "../views"));
        // this.app.set("view engine", "pug");
        //use logger middleware
        this.app.use(logger("dev"));
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
        DownloadTubeRoute_1.DownloadTubeRoute.create(router); // /youtube-download/:videoID
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
/// <reference path="_all.d.ts" /> 

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0YsYUFBQztBQUFELENBNUdBLEFBNEdDLElBQUE7QUE1R1ksd0JBQU07QUE4R25CLGtDQUFrQyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xyXG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSBcImNvb2tpZS1wYXJzZXJcIjtcclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgKiBhcyBsb2dnZXIgZnJvbSBcIm1vcmdhblwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG4vLyBpbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSBcImVycm9ySGFuZGxlclwiO1xyXG52YXIgZXJyb3JIYW5kbGVyID0gcmVxdWlyZShcImVycm9yaGFuZGxlclwiKTtcclxuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSBcIm1ldGhvZC1vdmVycmlkZVwiO1xyXG4vLyBpbXBvcnQgbWV0aG9kT3ZlcnJpZGUgPSByZXF1aXJlKFwibWV0aG9kLW92ZXJyaWRlXCIpO1xyXG5cclxuLy8gUm91dGVzXHJcbmltcG9ydCB7IEluZGV4Um91dGUgfSBmcm9tIFwiLi9yb3V0ZXMvSW5kZXhSb3V0ZVwiO1xyXG5pbXBvcnQgeyBEb3dubG9hZFR1YmVSb3V0ZSB9IGZyb20gXCIuL3JvdXRlcy9Eb3dubG9hZFR1YmVSb3V0ZVwiO1xyXG4vLyBEOiBcXFByb2plY3RzXFxNTVxcbXVzaWNxXFxzcmNcXHNjcmlwdHNcXEluZGV4Um91dGUudHNcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJ2ZXIge1xyXG5cclxuXHRwdWJsaWMgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xyXG5cclxuXHQvKipcclxuXHQgKiBCb290c3RyYXAgdGhlIGFwcGxpY2F0aW9uLlxyXG5cdCAqXHJcblx0ICogQGNsYXNzIFNlcnZlclxyXG5cdCAqIEBtZXRob2QgYm9vdHN0cmFwXHJcblx0ICogQHN0YXRpY1xyXG5cdCAqIEByZXR1cm4ge25nLmF1dG8uSUluamVjdG9yU2VydmljZX0gUmV0dXJucyB0aGUgbmV3bHkgY3JlYXRlZCBpbmplY3RvciBmb3IgdGhpcyBhcHAuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBib290c3RyYXAoKTogU2VydmVyIHtcclxuXHRcdHJldHVybiBuZXcgU2VydmVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIENvbnN0cnVjdG9yXHJcblx0KlxyXG5cdCogQGNsYXNzIFNlcnZlclxyXG5cdCogQGNvbnN0cnVjdG9yXHJcblx0Ki9cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8vIGNyZWF0ZSBleHByZXNzanMgYXBwbGljYXRpb25cclxuXHRcdHRoaXMuYXBwID0gZXhwcmVzcygpO1xyXG5cclxuXHRcdC8vIGNvbmZpZ3VyZSBhcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5jb25maWcoKTtcclxuXHJcblx0XHQvLyBhZGQgcm91dGVzXHJcblx0XHR0aGlzLnJvdXRlcygpO1xyXG5cclxuXHRcdC8vIGFkZCBhcGlcclxuXHRcdHRoaXMuYXBpKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgUkVTVCBBUEkgcm91dGVzXHJcblx0ICpcclxuXHQgKiBAY2xhc3MgU2VydmVyXHJcblx0ICogQG1ldGhvZCBhcGlcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBpKCkge1xyXG5cdFx0Ly9lbXB0eSBmb3Igbm93XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25maWd1cmUgYXBwbGljYXRpb25cclxuXHQgKlxyXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcclxuXHQgKiBAbWV0aG9kIGNvbmZpZ1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb25maWcoKSB7XHJcblxyXG5cdFx0Ly8gYWRkIHN0YXRpYyBwYXRoc1xyXG5cdFx0dGhpcy5hcHAudXNlKCcvc3RhdGljJywgZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3d3dycpKSk7XHJcblxyXG5cdFx0Ly8gTk9URTogTk9UIE5FRURFRCBmb3Igbm93XHJcblx0XHQvLyBjb25maWd1cmUgcHVnIHRlbXBsYXRlIGVuZ2luZVxyXG5cdFx0Ly8gdGhpcy5hcHAuc2V0KFwidmlld3NcIiwgcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi92aWV3c1wiKSk7XHJcblx0XHQvLyB0aGlzLmFwcC5zZXQoXCJ2aWV3IGVuZ2luZVwiLCBcInB1Z1wiKTtcclxuXHJcblx0XHQvL3VzZSBsb2dnZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGxvZ2dlcihcImRldlwiKSk7XHJcblxyXG5cdFx0Ly91c2UganNvbiBmcm9tIHBhcnNlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxuXHRcdC8vdXNlIHF1ZXJ5IHN0cmluZyBwYXJzZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7ZXh0ZW5kZWQ6dHJ1ZX0pKTtcclxuXHJcblx0XHQvL3VzZSBjb29raWUgcGFyc2VyIG1pZGRsZXdhcmVcclxuXHRcdHRoaXMuYXBwLnVzZShjb29raWVQYXJzZXIoXCJTRUNSRVRfR09FU19IRVJFXCIpKTtcclxuXHJcblx0XHQvL3VzZXIgb3ZlcnJpZGUgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xyXG5cclxuXHRcdC8vY2F0Y2ggZXJyb3IgNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGVycm9yaGFuZGxlclxyXG5cdFx0dGhpcy5hcHAudXNlKChlcnI6YW55LCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG5cdFx0XHQvLyBlcnIuc3RhdHVzID0gNDA0O1xyXG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCgpO1xyXG5cdFx0XHRuZXh0KGVycik7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL2Vycm9yIGhhbmRsaW5nXHJcblx0XHR0aGlzLmFwcC51c2UoZXJyb3JIYW5kbGVyKCkpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAqIENyZWF0ZSByb3V0ZXNcclxuICAgKlxyXG4gICAqIEBjbGFzcyBTZXJ2ZXJcclxuICAgKiBAbWV0aG9kIHJvdXRlc1xyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG5cdHB1YmxpYyByb3V0ZXMoKSB7XHJcblx0XHRsZXQgcm91dGVyOiBleHByZXNzLlJvdXRlcjtcclxuXHRcdHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5cdFx0Ly8gUm91dGVzIGluaXRcclxuXHRcdEluZGV4Um91dGUuY3JlYXRlKHJvdXRlcik7IC8vIC9cclxuXHRcdERvd25sb2FkVHViZVJvdXRlLmNyZWF0ZShyb3V0ZXIpOyAvLyAveW91dHViZS1kb3dubG9hZC86dmlkZW9JRFxyXG5cclxuXHRcdC8vdXNlIHJvdXRlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2Uocm91dGVyKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfYWxsLmQudHNcIiAvPiJdLCJzb3VyY2VSb290IjoiIn0=
