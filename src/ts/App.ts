//Server dependencies
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express = require("express");
import { Express } from "express-serve-static-core";
import bunyan from "bunyan";
import bunyanMiddleware from "bunyan-middleware";
// import * as path from "path";
import "reflect-metadata";
var cors = require("cors");

// import errorHandler from "errorHandler";
import methodOverride from "method-override";
// import methodOverride = require("method-override");

// injector and references
import "reflect-metadata";
import { container } from "tsyringe";

// services
import { RootService } from "./services/RootService";

// Routes
import { BaseRoute } from "./routes/BaseRoute/BaseRoute";
import { IndexRoute } from "./routes/IndexRoute/IndexRoute";
import { StreamTubeRoute } from "./routes/StreamTubeRoute/StreamTubeRoute";
import { SearchTubeRoute } from "./routes/SearchTubeRoute/SearchTubeRoute";

export class Server {

	private servicesDepencyTree: any;
	public app: Express;
	private logger: any;

	/**
	 * Bootstrap the application.
	 *
	 * @class Server
	 * @method bootstrap
	 * @static
	 */
	public static bootstrap(): Server {
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
		this.servicesDepencyTree = container.resolve(RootService);
	}

	/**
	 * Create REST API routes
	 *
	 * @class Server
	 * @method api
	 */
	public api() {
		//empty for now
	}

	/**
	 * Configure application
	 *
	 * @class Server
	 * @method config
	 */
	public config() {

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
		this.app.use(cors());

		//use json from parser middleware
		this.app.use(bodyParser.json());

		//use query string parser middleware
		this.app.use(bodyParser.urlencoded({extended: true}));

		//use cookie parser middleware
		this.app.use(cookieParser("SECRET_GOES_HERE"));

		//user override middleware
		this.app.use(methodOverride());

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
	public routes() {
		const router = express.Router();
		let routes: BaseRoute[] = [];

		// Routes init
		container.register("Router", {
			useValue: router
		});

		// TODO: iterate over routes and inject services to Routes(Controllers)
		routes.push(container.resolve(IndexRoute));
		routes.push(container.resolve(StreamTubeRoute));
		routes.push(container.resolve(SearchTubeRoute));

		//use router middleware
		// registering the routes in the Express app
		this.app.use(router);
	}
}

/// <reference path="_all.d.ts" />