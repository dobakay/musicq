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
        DownloadTubeRoute_1.DownloadTubeRoute.create(router); // /youtube-download/:videoID
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
/// <reference path="_all.d.ts" />

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUMvQixxQ0FBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7UUFFL0QsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDRixhQUFDO0FBQUQsQ0EvR0EsQUErR0MsSUFBQTtBQS9HWSx3QkFBTTtBQWlIbkIsa0NBQWtDIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XHJcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tIFwiY29va2llLXBhcnNlclwiO1xyXG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCAqIGFzIGxvZ2dlciBmcm9tIFwibW9yZ2FuXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxudmFyIGNvcnMgPSByZXF1aXJlKFwiY29yc1wiKTtcclxuXHJcbi8vIGltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tIFwiZXJyb3JIYW5kbGVyXCI7XHJcbnZhciBlcnJvckhhbmRsZXIgPSByZXF1aXJlKFwiZXJyb3JoYW5kbGVyXCIpO1xyXG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tIFwibWV0aG9kLW92ZXJyaWRlXCI7XHJcbi8vIGltcG9ydCBtZXRob2RPdmVycmlkZSA9IHJlcXVpcmUoXCJtZXRob2Qtb3ZlcnJpZGVcIik7XHJcblxyXG4vLyBSb3V0ZXNcclxuaW1wb3J0IHsgSW5kZXhSb3V0ZSB9IGZyb20gXCIuL3JvdXRlcy9JbmRleFJvdXRlXCI7XHJcbmltcG9ydCB7IERvd25sb2FkVHViZVJvdXRlIH0gZnJvbSBcIi4vcm91dGVzL0Rvd25sb2FkVHViZVJvdXRlXCI7XHJcbi8vIEQ6IFxcUHJvamVjdHNcXE1NXFxtdXNpY3FcXHNyY1xcc2NyaXB0c1xcSW5kZXhSb3V0ZS50c1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZlciB7XHJcblxyXG5cdHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAY2xhc3MgU2VydmVyXHJcblx0ICogQG1ldGhvZCBib290c3RyYXBcclxuXHQgKiBAc3RhdGljXHJcblx0ICogQHJldHVybiB7bmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlfSBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIGluamVjdG9yIGZvciB0aGlzIGFwcC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGJvb3RzdHJhcCgpOiBTZXJ2ZXIge1xyXG5cdFx0cmV0dXJuIG5ldyBTZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogQ29uc3RydWN0b3JcclxuXHQqXHJcblx0KiBAY2xhc3MgU2VydmVyXHJcblx0KiBAY29uc3RydWN0b3JcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly8gY3JlYXRlIGV4cHJlc3NqcyBhcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5hcHAgPSBleHByZXNzKCk7XHJcblxyXG5cdFx0Ly8gY29uZmlndXJlIGFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLmNvbmZpZygpO1xyXG5cclxuXHRcdC8vIGFkZCByb3V0ZXNcclxuXHRcdHRoaXMucm91dGVzKCk7XHJcblxyXG5cdFx0Ly8gYWRkIGFwaVxyXG5cdFx0dGhpcy5hcGkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBSRVNUIEFQSSByb3V0ZXNcclxuXHQgKlxyXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcclxuXHQgKiBAbWV0aG9kIGFwaVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcGkoKSB7XHJcblx0XHQvL2VtcHR5IGZvciBub3dcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbmZpZ3VyZSBhcHBsaWNhdGlvblxyXG5cdCAqXHJcblx0ICogQGNsYXNzIFNlcnZlclxyXG5cdCAqIEBtZXRob2QgY29uZmlnXHJcblx0ICovXHJcblx0cHVibGljIGNvbmZpZygpIHtcclxuXHJcblx0XHQvLyBhZGQgc3RhdGljIHBhdGhzXHJcblx0XHR0aGlzLmFwcC51c2UoXCIvc3RhdGljXCIsIGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vd3d3XCIpKSk7XHJcblxyXG5cdFx0Ly8gTk9URTogTk9UIE5FRURFRCBmb3Igbm93XHJcblx0XHQvLyBjb25maWd1cmUgcHVnIHRlbXBsYXRlIGVuZ2luZVxyXG5cdFx0Ly8gdGhpcy5hcHAuc2V0KFwidmlld3NcIiwgcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi92aWV3c1wiKSk7XHJcblx0XHQvLyB0aGlzLmFwcC5zZXQoXCJ2aWV3IGVuZ2luZVwiLCBcInB1Z1wiKTtcclxuXHJcblx0XHQvL3VzZSBsb2dnZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGxvZ2dlcihcImRldlwiKSk7XHJcblxyXG5cdFx0Ly8gZW5hYmxlIENPUlNcclxuXHRcdHRoaXMuYXBwLnVzZShjb3JzKCkpO1xyXG5cclxuXHRcdC8vdXNlIGpzb24gZnJvbSBwYXJzZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcclxuXHJcblx0XHQvL3VzZSBxdWVyeSBzdHJpbmcgcGFyc2VyIG1pZGRsZXdhcmVcclxuXHRcdHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe2V4dGVuZGVkOiB0cnVlfSkpO1xyXG5cclxuXHRcdC8vdXNlIGNvb2tpZSBwYXJzZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGNvb2tpZVBhcnNlcihcIlNFQ1JFVF9HT0VTX0hFUkVcIikpO1xyXG5cclxuXHRcdC8vdXNlciBvdmVycmlkZSBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XHJcblxyXG5cdFx0Ly9jYXRjaCBlcnJvciA0MDQgYW5kIGZvcndhcmQgdG8gZXJyb3IgZXJyb3JoYW5kbGVyXHJcblx0XHR0aGlzLmFwcC51c2UoKGVycjogYW55LCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4ge1xyXG5cdFx0XHQvLyBlcnIuc3RhdHVzID0gNDA0O1xyXG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCgpO1xyXG5cdFx0XHRuZXh0KGVycik7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL2Vycm9yIGhhbmRsaW5nXHJcblx0XHR0aGlzLmFwcC51c2UoZXJyb3JIYW5kbGVyKCkpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG4gICAqIENyZWF0ZSByb3V0ZXNcclxuICAgKlxyXG4gICAqIEBjbGFzcyBTZXJ2ZXJcclxuICAgKiBAbWV0aG9kIHJvdXRlc1xyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG5cdHB1YmxpYyByb3V0ZXMoKSB7XHJcblx0XHRsZXQgcm91dGVyOiBleHByZXNzLlJvdXRlcjtcclxuXHRcdHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5cdFx0Ly8gUm91dGVzIGluaXRcclxuXHRcdEluZGV4Um91dGUuY3JlYXRlKHJvdXRlcik7IC8vIC9cclxuXHRcdERvd25sb2FkVHViZVJvdXRlLmNyZWF0ZShyb3V0ZXIpOyAvLyAveW91dHViZS1kb3dubG9hZC86dmlkZW9JRFxyXG5cclxuXHRcdC8vdXNlIHJvdXRlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2Uocm91dGVyKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfYWxsLmQudHNcIiAvPiJdLCJzb3VyY2VSb290IjoiLi5cXHNyYyJ9
