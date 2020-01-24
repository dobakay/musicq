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
// injector and references
require("reflect-metadata");
var tsyringe_1 = require("tsyringe");
// Routes
var IndexRoute_1 = require("./routes/IndexRoute");
var StreamTubeRoute_1 = require("./routes/StreamTubeRoute");
var SearchTubeRoute_1 = require("./routes/SearchTubeRoute");
var RootService_1 = require("./services/RootService");
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
        //create service dependency tree
        this.resolveDependencies();
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
     * Resolve Service dependencies
     *
     * @class Server
     * @method resolveDependencies
     */
    Server.prototype.resolveDependencies = function () {
        this.servicesDepencyTree = tsyringe_1.container.resolve(RootService_1.RootService);
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
        var routes = [];
        // Routes init
        // TODO: iterate over routes and inject services to Routes(Controllers)
        routes.push(tsyringe_1.container.resolve(IndexRoute_1.IndexRoute)); // /
        routes.push(tsyringe_1.container.resolve(StreamTubeRoute_1.StreamTubeRoute));
        routes.push(tsyringe_1.container.resolve(SearchTubeRoute_1.SearchTubeRoute));
        //use router middleware
        // registering the routes in the Express app
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
/// <reference path="_all.d.ts" />

//# sourceMappingURL=source_maps/App.js.map
