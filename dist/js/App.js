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
            err.status = 404;
            console.log(err);
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
        // IndexRoute
        IndexRoute_1.IndexRoute.create(router);
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
/// <reference path="_all.d.ts" /> 

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LGtDQUFrQyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xyXG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSBcImNvb2tpZS1wYXJzZXJcIjtcclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgKiBhcyBsb2dnZXIgZnJvbSBcIm1vcmdhblwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG4vLyBpbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSBcImVycm9ySGFuZGxlclwiO1xyXG52YXIgZXJyb3JIYW5kbGVyID0gcmVxdWlyZShcImVycm9yaGFuZGxlclwiKTtcclxuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSBcIm1ldGhvZC1vdmVycmlkZVwiO1xyXG4vLyBpbXBvcnQgbWV0aG9kT3ZlcnJpZGUgPSByZXF1aXJlKFwibWV0aG9kLW92ZXJyaWRlXCIpO1xyXG5cclxuLy8gUm91dGVzXHJcbmltcG9ydCB7IEluZGV4Um91dGUgfSBmcm9tIFwiLi9yb3V0ZXMvSW5kZXhSb3V0ZVwiO1xyXG4vLyBEOiBcXFByb2plY3RzXFxNTVxcbXVzaWNxXFxzcmNcXHNjcmlwdHNcXEluZGV4Um91dGUudHNcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXJ2ZXIge1xyXG5cclxuXHRwdWJsaWMgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xyXG5cclxuXHQvKipcclxuXHQgKiBCb290c3RyYXAgdGhlIGFwcGxpY2F0aW9uLlxyXG5cdCAqXHJcblx0ICogQGNsYXNzIFNlcnZlclxyXG5cdCAqIEBtZXRob2QgYm9vdHN0cmFwXHJcblx0ICogQHN0YXRpY1xyXG5cdCAqIEByZXR1cm4ge25nLmF1dG8uSUluamVjdG9yU2VydmljZX0gUmV0dXJucyB0aGUgbmV3bHkgY3JlYXRlZCBpbmplY3RvciBmb3IgdGhpcyBhcHAuXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBib290c3RyYXAoKTogU2VydmVyIHtcclxuXHRcdHJldHVybiBuZXcgU2VydmVyKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIENvbnN0cnVjdG9yXHJcblx0KlxyXG5cdCogQGNsYXNzIFNlcnZlclxyXG5cdCogQGNvbnN0cnVjdG9yXHJcblx0Ki9cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8vIGNyZWF0ZSBleHByZXNzanMgYXBwbGljYXRpb25cclxuXHRcdHRoaXMuYXBwID0gZXhwcmVzcygpO1xyXG5cclxuXHRcdC8vIGNvbmZpZ3VyZSBhcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5jb25maWcoKTtcclxuXHJcblx0XHQvLyBhZGQgcm91dGVzXHJcblx0XHR0aGlzLnJvdXRlcygpO1xyXG5cclxuXHRcdC8vIGFkZCBhcGlcclxuXHRcdHRoaXMuYXBpKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgUkVTVCBBUEkgcm91dGVzXHJcblx0ICpcclxuXHQgKiBAY2xhc3MgU2VydmVyXHJcblx0ICogQG1ldGhvZCBhcGlcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBpKCkge1xyXG5cdFx0Ly9lbXB0eSBmb3Igbm93XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25maWd1cmUgYXBwbGljYXRpb25cclxuXHQgKlxyXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcclxuXHQgKiBAbWV0aG9kIGNvbmZpZ1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb25maWcoKSB7XHJcblxyXG5cdFx0Ly8gYWRkIHN0YXRpYyBwYXRoc1xyXG5cdFx0dGhpcy5hcHAudXNlKCcvc3RhdGljJywgZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3d3dycpKSk7XHJcblxyXG5cdFx0Ly8gTk9URTogTk9UIE5FRURFRCBmb3Igbm93XHJcblx0XHQvLyBjb25maWd1cmUgcHVnIHRlbXBsYXRlIGVuZ2luZVxyXG5cdFx0Ly8gdGhpcy5hcHAuc2V0KFwidmlld3NcIiwgcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi92aWV3c1wiKSk7XHJcblx0XHQvLyB0aGlzLmFwcC5zZXQoXCJ2aWV3IGVuZ2luZVwiLCBcInB1Z1wiKTtcclxuXHJcblx0XHQvL3VzZSBsb2dnZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGxvZ2dlcihcImRldlwiKSk7XHJcblxyXG5cdFx0Ly91c2UganNvbiBmcm9tIHBhcnNlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxuXHRcdC8vdXNlIHF1ZXJ5IHN0cmluZyBwYXJzZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7ZXh0ZW5kZWQ6dHJ1ZX0pKTtcclxuXHJcblx0XHQvL3VzZSBjb29raWUgcGFyc2VyIG1pZGRsZXdhcmVcclxuXHRcdHRoaXMuYXBwLnVzZShjb29raWVQYXJzZXIoXCJTRUNSRVRfR09FU19IRVJFXCIpKTtcclxuXHJcblx0XHQvL3VzZXIgb3ZlcnJpZGUgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xyXG5cclxuXHRcdC8vY2F0Y2ggZXJyb3IgNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGVycm9yaGFuZGxlclxyXG5cdFx0dGhpcy5hcHAudXNlKGZ1bmN0aW9uKGVycjphbnksIHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSB7XHJcblx0XHRcdGVyci5zdGF0dXMgPSA0MDQ7XHJcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdG5leHQoZXJyKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vZXJyb3IgaGFuZGxpbmdcclxuXHRcdHRoaXMuYXBwLnVzZShlcnJvckhhbmRsZXIoKSk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICogQ3JlYXRlIHJvdXRlc1xyXG4gICAqXHJcbiAgICogQGNsYXNzIFNlcnZlclxyXG4gICAqIEBtZXRob2Qgcm91dGVzXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcblx0cHVibGljIHJvdXRlcygpIHtcclxuXHRcdGxldCByb3V0ZXI6IGV4cHJlc3MuUm91dGVyO1xyXG5cdFx0cm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcblx0XHQvLyBJbmRleFJvdXRlXHJcblx0XHRJbmRleFJvdXRlLmNyZWF0ZShyb3V0ZXIpO1xyXG5cclxuXHRcdC8vdXNlIHJvdXRlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2Uocm91dGVyKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfYWxsLmQudHNcIiAvPiJdLCJzb3VyY2VSb290IjoiIn0=
