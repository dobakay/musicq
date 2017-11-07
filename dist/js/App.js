"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var errorHandler = require("errorHandler");
var methodOverride = require("method-override");
// import errorHandler = require("errorhandler");
// import methodOverride = require("method-override");
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
        this.app.use(express.static(path.join(__dirname, "public")));
        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        // this.app.set("views engine", "pug");
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
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /**
   * Create router
   *
   * @class Server
   * @method api
   */
    Server.prototype.routes = function () {
        //empty for now
    };
    return Server;
}());
exports.Server = Server;
/// <reference path="_all.d.ts" /> 

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMEM7QUFDMUMsNENBQThDO0FBQzlDLGlDQUFtQztBQUNuQywrQkFBaUM7QUFDakMsMkJBQTZCO0FBRTdCLDJDQUE2QztBQUM3QyxnREFBa0Q7QUFDbEQsaURBQWlEO0FBQ2pELHNEQUFzRDtBQUV0RDtJQWdCQzs7Ozs7TUFLRTtJQUNGO1FBQ0MsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFckIsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZCxVQUFVO1FBQ1YsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQTlCRDs7Ozs7OztPQU9HO0lBQ1csZ0JBQVMsR0FBdkI7UUFDQyxNQUFNLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBc0JEOzs7OztPQUtHO0lBQ0ksb0JBQUcsR0FBVjtRQUNDLGVBQWU7SUFDaEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksdUJBQU0sR0FBYjtRQUVDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3RCxlQUFlO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDckQsdUNBQXVDO1FBRXZDLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU1QixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFaEMsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJELDhCQUE4QjtRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBRS9DLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBRS9CLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQU8sRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7WUFDckcsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUU5QixDQUFDO0lBRUQ7Ozs7O0tBS0k7SUFDRyx1QkFBTSxHQUFiO1FBQ0MsZUFBZTtJQUNoQixDQUFDO0lBQ0YsYUFBQztBQUFELENBaEdBLEFBZ0dDLElBQUE7QUFoR1ksd0JBQU07QUFrR25CLGtDQUFrQyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xyXG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSBcImNvb2tpZS1wYXJzZXJcIjtcclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgKiBhcyBsb2dnZXIgZnJvbSBcIm1vcmdhblwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBlcnJvckhhbmRsZXIgZnJvbSBcImVycm9ySGFuZGxlclwiO1xyXG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tIFwibWV0aG9kLW92ZXJyaWRlXCI7XHJcbi8vIGltcG9ydCBlcnJvckhhbmRsZXIgPSByZXF1aXJlKFwiZXJyb3JoYW5kbGVyXCIpO1xyXG4vLyBpbXBvcnQgbWV0aG9kT3ZlcnJpZGUgPSByZXF1aXJlKFwibWV0aG9kLW92ZXJyaWRlXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZlciB7XHJcblxyXG5cdHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAY2xhc3MgU2VydmVyXHJcblx0ICogQG1ldGhvZCBib290c3RyYXBcclxuXHQgKiBAc3RhdGljXHJcblx0ICogQHJldHVybiB7bmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlfSBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIGluamVjdG9yIGZvciB0aGlzIGFwcC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGJvb3RzdHJhcCgpOiBTZXJ2ZXIge1xyXG5cdFx0cmV0dXJuIG5ldyBTZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogQ29uc3RydWN0b3JcclxuXHQqXHJcblx0KiBAY2xhc3MgU2VydmVyXHJcblx0KiBAY29uc3RydWN0b3JcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly8gY3JlYXRlIGV4cHJlc3NqcyBhcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5hcHAgPSBleHByZXNzKCk7XHJcblxyXG5cdFx0Ly8gY29uZmlndXJlIGFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLmNvbmZpZygpO1xyXG5cclxuXHRcdC8vIGFkZCByb3V0ZXNcclxuXHRcdHRoaXMucm91dGVzKCk7XHJcblxyXG5cdFx0Ly8gYWRkIGFwaVxyXG5cdFx0dGhpcy5hcGkoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSBSRVNUIEFQSSByb3V0ZXNcclxuXHQgKlxyXG5cdCAqIEBjbGFzcyBTZXJ2ZXJcclxuXHQgKiBAbWV0aG9kIGFwaVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcGkoKSB7XHJcblx0XHQvL2VtcHR5IGZvciBub3dcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbmZpZ3VyZSBhcHBsaWNhdGlvblxyXG5cdCAqXHJcblx0ICogQGNsYXNzIFNlcnZlclxyXG5cdCAqIEBtZXRob2QgY29uZmlnXHJcblx0ICovXHJcblx0cHVibGljIGNvbmZpZygpIHtcclxuXHRcdFxyXG5cdFx0Ly8gYWRkIHN0YXRpYyBwYXRoc1xyXG5cdFx0dGhpcy5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIFwicHVibGljXCIpKSk7XHJcblxyXG5cdFx0Ly9jb25maWd1cmUgcHVnXHJcblx0XHR0aGlzLmFwcC5zZXQoXCJ2aWV3c1wiLCBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInZpZXdzXCIpKTtcclxuXHRcdC8vIHRoaXMuYXBwLnNldChcInZpZXdzIGVuZ2luZVwiLCBcInB1Z1wiKTtcclxuXHJcblx0XHQvL3VzZSBsb2dnZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGxvZ2dlcihcImRldlwiKSk7XHJcblxyXG5cdFx0Ly91c2UganNvbiBmcm9tIHBhcnNlciBtaWRkbGV3YXJlXHJcblx0XHR0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxuXHRcdC8vdXNlIHF1ZXJ5IHN0cmluZyBwYXJzZXIgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7ZXh0ZW5kZWQ6dHJ1ZX0pKTtcclxuXHJcblx0XHQvL3VzZSBjb29raWUgcGFyc2VyIG1pZGRsZXdhcmVcclxuXHRcdHRoaXMuYXBwLnVzZShjb29raWVQYXJzZXIoXCJTRUNSRVRfR09FU19IRVJFXCIpKTtcclxuXHJcblx0XHQvL3VzZXIgb3ZlcnJpZGUgbWlkZGxld2FyZVxyXG5cdFx0dGhpcy5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xyXG5cclxuXHRcdC8vY2F0Y2ggZXJyb3IgNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGVycm9yaGFuZGxlclxyXG5cdFx0dGhpcy5hcHAudXNlKGZ1bmN0aW9uKGVycjphbnksIHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSB7XHJcblx0XHRcdGVyci5zdGF0dXMgPSA0MDQ7XHJcblx0XHRcdG5leHQoZXJyKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vZXJyb3IgaGFuZGxpbmdcclxuXHRcdHRoaXMuYXBwLnVzZShlcnJvckhhbmRsZXIoKSk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcbiAgICogQ3JlYXRlIHJvdXRlclxyXG4gICAqXHJcbiAgICogQGNsYXNzIFNlcnZlclxyXG4gICAqIEBtZXRob2QgYXBpXHJcbiAgICovXHJcblx0cHVibGljIHJvdXRlcygpIHtcclxuXHRcdC8vZW1wdHkgZm9yIG5vd1xyXG5cdH1cclxufVxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9hbGwuZC50c1wiIC8+Il0sInNvdXJjZVJvb3QiOiIifQ==
