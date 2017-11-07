import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

import * as errorHandler from "errorHandler";
import * as methodOverride from "method-override";
// import errorHandler = require("errorhandler");
// import methodOverride = require("method-override");

export class Server {

	public app: express.Application;

	/**
	 * Bootstrap the application.
	 *
	 * @class Server
	 * @method bootstrap
	 * @static
	 * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
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
		this.app.use(express.static(path.join(__dirname, "public")));

		//configure pug
		this.app.set("views", path.join(__dirname, "views"));
		// this.app.set("views engine", "pug");

		//use logger middleware
		this.app.use(logger("dev"));

		//use json from parser middleware
		this.app.use(bodyParser.json());

		//use query string parser middleware
		this.app.use(bodyParser.urlencoded({extended:true}));

		//use cookie parser middleware
		this.app.use(cookieParser("SECRET_GOES_HERE"));

		//user override middleware
		this.app.use(methodOverride());

		//catch error 404 and forward to error errorhandler
		this.app.use(function(err:any, req: express.Request, res: express.Response, next: express.NextFunction) {
			err.status = 404;
			next(err);
		});

		//error handling
		this.app.use(errorHandler());

	}

	/**
   * Create router
   *
   * @class Server
   * @method api
   */
	public routes() {
		//empty for now
	}
}

/// <reference path="_all.d.ts" />