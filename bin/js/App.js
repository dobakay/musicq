"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Server dependencies
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express = require("express");
// import * as path from "path";
require("reflect-metadata");
var cors = require("cors");
// import errorHandler from "errorHandler";
const method_override_1 = __importDefault(require("method-override"));
// import methodOverride = require("method-override");
// injector and references
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
// services
const RootService_1 = require("./services/RootService");
const IndexRoute_1 = require("./routes/IndexRoute/IndexRoute");
const StreamTubeRoute_1 = require("./routes/StreamTubeRoute/StreamTubeRoute");
const SearchTubeRoute_1 = require("./routes/SearchTubeRoute/SearchTubeRoute");
class Server {
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    static bootstrap() {
        return new Server();
    }
    /**
    * Constructor
    *
    * @class Server
    * @constructor
    */
    constructor() {
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
     * Resolve Service dependencies
     *
     * @class Server
     * @method resolveServiceDependencies
     */
    resolveServiceDependencies() {
        this.servicesDepencyTree = tsyringe_1.container.resolve(RootService_1.RootService);
    }
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    api() {
        //empty for now
    }
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    config() {
        // add static paths
        // NOTE: Not Needed for now
        // this.app.use("/static", express.static(path.join(__dirname, "../www")));
        // NOTE: NOT NEEDED for now
        // configure pug template engine
        // this.app.set("views", path.join(__dirname, "../views"));
        // this.app.set("view engine", "pug");
        //use logger middleware
        // this.logger = bunyan.createLogger({ name: 'MusicQServer' });
        // this.app.use(bunyanMiddleware(
        // 	{ 
        // 		headerName: 'X-Request-Id', 
        // 		propertyName: 'reqId',
        // 		logName: 'req_id',
        // 		obscureHeaders: [],
        // 		logger: this.logger,
        // 		additionalRequestFinishData: function(req, res) {
        // 			return { example: true }
        // 	  	}
        // 	}
        // ));
        // enable CORS
        var corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        this.app.use(cors(corsOptions));
        //use json from parser middleware
        this.app.use(body_parser_1.default.json());
        //use query string parser middleware
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        //use cookie parser middleware
        this.app.use(cookie_parser_1.default("SECRET_GOES_HERE"));
        //user override middleware
        this.app.use(method_override_1.default());
        //catch error 404 and forward to error errorhandler
        // this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        // 	// err.status = 404;
        // 	console.log(err);
        // 	res.status(500).send();
        // 	next(err);
        // });
        // //error handling
        // this.app.use(errorHandler());
    }
    /**
   * Create routes
   *
   * @class Server
   * @method routes
   * @return void
   */
    routes() {
        const router = express.Router();
        let routes = [];
        // Routes init
        tsyringe_1.container.register("Router", {
            useValue: router
        });
        // TODO: iterate over routes and inject services to Routes(Controllers)
        routes.push(tsyringe_1.container.resolve(IndexRoute_1.IndexRoute));
        routes.push(tsyringe_1.container.resolve(StreamTubeRoute_1.StreamTubeRoute));
        routes.push(tsyringe_1.container.resolve(SearchTubeRoute_1.SearchTubeRoute));
        //use router middleware
        // registering the routes in the Express app
        this.app.use(router);
    }
}
exports.Server = Server;
/// <reference path="_all.d.ts" />

//# sourceMappingURL=source_maps/App.js.map
