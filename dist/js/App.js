"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var cors = require('cors');
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
        DownloadTubeRoute_1.DownloadTubeRoute.create(router); // /youtube-download/:videoID
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
/// <reference path="_all.d.ts" /> 

//# sourceMappingURL=data:application/json;charset=utf8;base64,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dUJBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQy9CLHFDQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDZCQUE2QjtRQUUvRCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQS9HQSxBQStHQyxJQUFBO0FBL0dZLHdCQUFNO0FBaUhuQixrQ0FBa0MiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcclxuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XHJcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0ICogYXMgbG9nZ2VyIGZyb20gXCJtb3JnYW5cIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG52YXIgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcclxuXHJcbi8vIGltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tIFwiZXJyb3JIYW5kbGVyXCI7XHJcbnZhciBlcnJvckhhbmRsZXIgPSByZXF1aXJlKFwiZXJyb3JoYW5kbGVyXCIpO1xyXG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tIFwibWV0aG9kLW92ZXJyaWRlXCI7XHJcbi8vIGltcG9ydCBtZXRob2RPdmVycmlkZSA9IHJlcXVpcmUoXCJtZXRob2Qtb3ZlcnJpZGVcIik7XHJcblxyXG4vLyBSb3V0ZXNcclxuaW1wb3J0IHsgSW5kZXhSb3V0ZSB9IGZyb20gXCIuL3JvdXRlcy9JbmRleFJvdXRlXCI7XHJcbmltcG9ydCB7IERvd25sb2FkVHViZVJvdXRlIH0gZnJvbSBcIi4vcm91dGVzL0Rvd25sb2FkVHViZVJvdXRlXCI7XHJcbi8vIEQ6IFxcUHJvamVjdHNcXE1NXFxtdXNpY3FcXHNyY1xcc2NyaXB0c1xcSW5kZXhSb3V0ZS50c1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZlciB7XHJcblxyXG5cdHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAY2xhc3MgU2VydmVyXHJcblx0ICogQG1ldGhvZCBib290c3RyYXBcclxuXHQgKiBAc3RhdGljXHJcblx0ICogQHJldHVybiB7bmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlfSBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIGluamVjdG9yIGZvciB0aGlzIGFwcC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGJvb3RzdHJhcCgpOiBTZXJ2ZXIge1xyXG5cdFx0cmV0dXJuIG5ldyBTZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogQ29uc3RydWN0b3JcclxuXHQqXHJcblx0KiBAY2xhc3MgU2VydmVyXHJcblx0KiBAY29uc3RydWN0b3JcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly8gY3JlYXRlIGV4cHJlc3NqcyBhcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5hcHAgPSBleHByZXNzKCk7XHJcblxyXG5cdFx0Ly8gY29uZmlndXJlIGFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLmNvbmZpZygpO1xyXG5cclxuXHRcdC8vIGFkZCByb3V0ZXNcclxuXHRcdHRoaXMucm91dGVzKCk7XHJcblxyXG5cdFx0Ly8gYWRkIGFwaVxyXG5cdFx0dGhpcy5hcGkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBSRVNUIEFQSSByb3V0ZXNcclxuXHQgKlxyXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcclxuXHQgKiBAbWV0aG9kIGFwaVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcGkoKSB7XHJcblx0XHQvL2VtcHR5IGZvciBub3dcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbmZpZ3VyZSBhcHBsaWNhdGlvblxyXG5cdCAqXHJcblx0ICogQGNsYXNzIFNlcnZlclxyXG5cdCAqIEBtZXRob2QgY29uZmlnXHJcblx0ICovXHJcblx0cHVibGljIGNvbmZpZygpIHtcclxuXHJcblx0XHQvLyBhZGQgc3RhdGljIHBhdGhzXHJcblx0XHR0aGlzLmFwcC51c2UoJy9zdGF0aWMnLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vd3d3JykpKTtcclxuXHJcblx0XHQvLyBOT1RFOiBOT1QgTkVFREVEIGZvciBub3dcclxuXHRcdC8vIGNvbmZpZ3VyZSBwdWcgdGVtcGxhdGUgZW5naW5lXHJcblx0XHQvLyB0aGlzLmFwcC5zZXQoXCJ2aWV3c1wiLCBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL3ZpZXdzXCIpKTtcclxuXHRcdC8vIHRoaXMuYXBwLnNldChcInZpZXcgZW5naW5lXCIsIFwicHVnXCIpO1xyXG5cclxuXHRcdC8vdXNlIGxvZ2dlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UobG9nZ2VyKFwiZGV2XCIpKTtcclxuXHJcblx0XHQvLyBlbmFibGUgQ09SU1xyXG5cdFx0dGhpcy5hcHAudXNlKGNvcnMoKSk7XHJcblxyXG5cdFx0Ly91c2UganNvbiBmcm9tIHBhcnNlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxuXHRcdC8vdXNlIHF1ZXJ5IHN0cmluZyBwYXJzZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7ZXh0ZW5kZWQ6dHJ1ZX0pKTtcclxuXHJcblx0XHQvL3VzZSBjb29raWUgcGFyc2VyIG1pZGRsZXdhcmVcclxuXHRcdHRoaXMuYXBwLnVzZShjb29raWVQYXJzZXIoXCJTRUNSRVRfR09FU19IRVJFXCIpKTtcclxuXHJcblx0XHQvL3VzZXIgb3ZlcnJpZGUgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xyXG5cclxuXHRcdC8vY2F0Y2ggZXJyb3IgNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGVycm9yaGFuZGxlclxyXG5cdFx0dGhpcy5hcHAudXNlKChlcnI6YW55LCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG5cdFx0XHQvLyBlcnIuc3RhdHVzID0gNDA0O1xyXG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCgpO1xyXG5cdFx0XHRuZXh0KGVycik7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL2Vycm9yIGhhbmRsaW5nXHJcblx0XHR0aGlzLmFwcC51c2UoZXJyb3JIYW5kbGVyKCkpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAqIENyZWF0ZSByb3V0ZXNcclxuICAgKlxyXG4gICAqIEBjbGFzcyBTZXJ2ZXJcclxuICAgKiBAbWV0aG9kIHJvdXRlc1xyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG5cdHB1YmxpYyByb3V0ZXMoKSB7XHJcblx0XHRsZXQgcm91dGVyOiBleHByZXNzLlJvdXRlcjtcclxuXHRcdHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5cdFx0Ly8gUm91dGVzIGluaXRcclxuXHRcdEluZGV4Um91dGUuY3JlYXRlKHJvdXRlcik7IC8vIC9cclxuXHRcdERvd25sb2FkVHViZVJvdXRlLmNyZWF0ZShyb3V0ZXIpOyAvLyAveW91dHViZS1kb3dubG9hZC86dmlkZW9JRFxyXG5cclxuXHRcdC8vdXNlIHJvdXRlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2Uocm91dGVyKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfYWxsLmQudHNcIiAvPiJdLCJzb3VyY2VSb290IjoiLi5cXHNyYyJ9
