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
        // DownloadTubeRoute.create(router); // /youtube-download/:videoID
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
/// <reference path="_all.d.ts" /> 

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUM7SUFDRixhQUFDO0FBQUQsQ0E1R0EsQUE0R0MsSUFBQTtBQTVHWSx3QkFBTTtBQThHbkIsa0NBQWtDIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XHJcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tIFwiY29va2llLXBhcnNlclwiO1xyXG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCAqIGFzIGxvZ2dlciBmcm9tIFwibW9yZ2FuXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIGltcG9ydCAqIGFzIGVycm9ySGFuZGxlciBmcm9tIFwiZXJyb3JIYW5kbGVyXCI7XHJcbnZhciBlcnJvckhhbmRsZXIgPSByZXF1aXJlKFwiZXJyb3JoYW5kbGVyXCIpO1xyXG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tIFwibWV0aG9kLW92ZXJyaWRlXCI7XHJcbi8vIGltcG9ydCBtZXRob2RPdmVycmlkZSA9IHJlcXVpcmUoXCJtZXRob2Qtb3ZlcnJpZGVcIik7XHJcblxyXG4vLyBSb3V0ZXNcclxuaW1wb3J0IHsgSW5kZXhSb3V0ZSB9IGZyb20gXCIuL3JvdXRlcy9JbmRleFJvdXRlXCI7XHJcbmltcG9ydCB7IERvd25sb2FkVHViZVJvdXRlIH0gZnJvbSBcIi4vcm91dGVzL0Rvd25sb2FkVHViZVJvdXRlXCI7XHJcbi8vIEQ6IFxcUHJvamVjdHNcXE1NXFxtdXNpY3FcXHNyY1xcc2NyaXB0c1xcSW5kZXhSb3V0ZS50c1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZlciB7XHJcblxyXG5cdHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAY2xhc3MgU2VydmVyXHJcblx0ICogQG1ldGhvZCBib290c3RyYXBcclxuXHQgKiBAc3RhdGljXHJcblx0ICogQHJldHVybiB7bmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlfSBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIGluamVjdG9yIGZvciB0aGlzIGFwcC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGJvb3RzdHJhcCgpOiBTZXJ2ZXIge1xyXG5cdFx0cmV0dXJuIG5ldyBTZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogQ29uc3RydWN0b3JcclxuXHQqXHJcblx0KiBAY2xhc3MgU2VydmVyXHJcblx0KiBAY29uc3RydWN0b3JcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly8gY3JlYXRlIGV4cHJlc3NqcyBhcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5hcHAgPSBleHByZXNzKCk7XHJcblxyXG5cdFx0Ly8gY29uZmlndXJlIGFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLmNvbmZpZygpO1xyXG5cclxuXHRcdC8vIGFkZCByb3V0ZXNcclxuXHRcdHRoaXMucm91dGVzKCk7XHJcblxyXG5cdFx0Ly8gYWRkIGFwaVxyXG5cdFx0dGhpcy5hcGkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBSRVNUIEFQSSByb3V0ZXNcclxuXHQgKlxyXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcclxuXHQgKiBAbWV0aG9kIGFwaVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcGkoKSB7XHJcblx0XHQvL2VtcHR5IGZvciBub3dcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbmZpZ3VyZSBhcHBsaWNhdGlvblxyXG5cdCAqXHJcblx0ICogQGNsYXNzIFNlcnZlclxyXG5cdCAqIEBtZXRob2QgY29uZmlnXHJcblx0ICovXHJcblx0cHVibGljIGNvbmZpZygpIHtcclxuXHJcblx0XHQvLyBhZGQgc3RhdGljIHBhdGhzXHJcblx0XHR0aGlzLmFwcC51c2UoJy9zdGF0aWMnLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vd3d3JykpKTtcclxuXHJcblx0XHQvLyBOT1RFOiBOT1QgTkVFREVEIGZvciBub3dcclxuXHRcdC8vIGNvbmZpZ3VyZSBwdWcgdGVtcGxhdGUgZW5naW5lXHJcblx0XHQvLyB0aGlzLmFwcC5zZXQoXCJ2aWV3c1wiLCBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL3ZpZXdzXCIpKTtcclxuXHRcdC8vIHRoaXMuYXBwLnNldChcInZpZXcgZW5naW5lXCIsIFwicHVnXCIpO1xyXG5cclxuXHRcdC8vdXNlIGxvZ2dlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UobG9nZ2VyKFwiZGV2XCIpKTtcclxuXHJcblx0XHQvL3VzZSBqc29uIGZyb20gcGFyc2VyIG1pZGRsZXdhcmVcclxuXHRcdHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XHJcblxyXG5cdFx0Ly91c2UgcXVlcnkgc3RyaW5nIHBhcnNlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDp0cnVlfSkpO1xyXG5cclxuXHRcdC8vdXNlIGNvb2tpZSBwYXJzZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGNvb2tpZVBhcnNlcihcIlNFQ1JFVF9HT0VTX0hFUkVcIikpO1xyXG5cclxuXHRcdC8vdXNlciBvdmVycmlkZSBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XHJcblxyXG5cdFx0Ly9jYXRjaCBlcnJvciA0MDQgYW5kIGZvcndhcmQgdG8gZXJyb3IgZXJyb3JoYW5kbGVyXHJcblx0XHR0aGlzLmFwcC51c2UoKGVycjphbnksIHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcblx0XHRcdC8vIGVyci5zdGF0dXMgPSA0MDQ7XHJcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdHJlcy5zdGF0dXMoNTAwKS5zZW5kKCk7XHJcblx0XHRcdG5leHQoZXJyKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vZXJyb3IgaGFuZGxpbmdcclxuXHRcdHRoaXMuYXBwLnVzZShlcnJvckhhbmRsZXIoKSk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICogQ3JlYXRlIHJvdXRlc1xyXG4gICAqXHJcbiAgICogQGNsYXNzIFNlcnZlclxyXG4gICAqIEBtZXRob2Qgcm91dGVzXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcblx0cHVibGljIHJvdXRlcygpIHtcclxuXHRcdGxldCByb3V0ZXI6IGV4cHJlc3MuUm91dGVyO1xyXG5cdFx0cm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcblx0XHQvLyBSb3V0ZXMgaW5pdFxyXG5cdFx0SW5kZXhSb3V0ZS5jcmVhdGUocm91dGVyKTsgLy8gL1xyXG5cdFx0Ly8gRG93bmxvYWRUdWJlUm91dGUuY3JlYXRlKHJvdXRlcik7IC8vIC95b3V0dWJlLWRvd25sb2FkLzp2aWRlb0lEXHJcblxyXG5cdFx0Ly91c2Ugcm91dGVyIG1pZGRsZXdhcmVcclxuXHRcdHRoaXMuYXBwLnVzZShyb3V0ZXIpO1xyXG5cdH1cclxufVxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9hbGwuZC50c1wiIC8+Il0sInNvdXJjZVJvb3QiOiIifQ==
