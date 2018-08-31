import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
var cors = require("cors");

// import * as errorHandler from "errorHandler";
var errorHandler = require("errorhandler");
import * as methodOverride from "method-override";
// import methodOverride = require("method-override");

// Routes
import { IndexRoute } from "./routes/IndexRoute";
import { StreamTubeRoute } from "./routes/StreamTubeRoute";
import { SearchTubeRoute } from "./routes/SearchTubeRoute";

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
		this.app.use(bodyParser.urlencoded({extended: true}));

		//use cookie parser middleware
		this.app.use(cookieParser("SECRET_GOES_HERE"));

		//user override middleware
		this.app.use(methodOverride());

		//catch error 404 and forward to error errorhandler
		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			// err.status = 404;
			console.log(err);
			res.status(500).send();
			next(err);
		});

		//error handling
		this.app.use(errorHandler());

	}

	/**
   * Create routes
   *
   * @class Server
   * @method routes
   * @return void
   */
	public routes() {
		let router: express.Router;
		router = express.Router();

		// Routes init
		IndexRoute.create(router); // /
		StreamTubeRoute.create(router); // /youtube-download/:videoID
		SearchTubeRoute.create(router);	// /search-youtube/

		//use router middleware
		this.app.use(router);
	}
}

/// <reference path="_all.d.ts" />