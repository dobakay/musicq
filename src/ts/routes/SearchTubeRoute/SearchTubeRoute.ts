import { NextFunction, Request, Response, Router } from "express-serve-static-core";
import {BaseRoute} from "../BaseRoute/BaseRoute";
import puppeteer from "puppeteer";
import { injectable, inject } from "tsyringe";
import {ISearchTubeRoute} from "./ISearchTubeRoute";

/**
 * "/search-youtube/?query" route
 *
 * @class SearchTubeRoute
 */
@injectable()
export class SearchTubeRoute extends BaseRoute implements ISearchTubeRoute {
    browser: any;
    path: string;
    /**
      * Constructor
      *
      * @class SearchTubeRoute
      * @constructor
      */
    // tslint:disable-next-line:typedef 
    constructor(@inject("Router") router: Router) { 
        super(router);
		this.path = "/search-youtube/";
        this.router.get(this.path, (req, res, next) => {
			this.index.call(this, req, res, next);
		});

        puppeteer.launch().then((br) => {
            this.browser = br;
        });
      }

      /**
       * The home page route.
       *
       * @class SearchTubeRoute
       * @method index
       * @param req {Request} The Express Request object.
       * @param res {Response} The Express Response object.
       * @param next {NextFunction} Execute the next method.
       */
       public index(req: Request, res: Response, next: NextFunction) {
			// set custom title
			console.log(this);
			this.title = "MusiqQ Home";

           	//set options
           	this.search(req.query.q, res);
       }

       public async search(q: string, response: Response) {
		   try {
				const page = await this.browser.newPage();
				let json;
				page.on("response", async (res: Response) => {
					json = await res.json();
					response.json(json);
				});
				page.on("error", (er: Error) => {
					console.log(er);
				});
				// page.on("close", (e: Event) => {
				// 	console.log(JSON.stringify(e));
				// 	response.send({
				// 		serverEvent: JSON.stringify(e),
				// 		msg: "search page was closed"
				// 	});
				// });
				await page.setExtraHTTPHeaders({Referer: "https://youtube.com"}); 
				await page.goto("https://youtube.com");
				setTimeout(async () => {
					await page.type("#search", q);
					await page.click("button#search-icon-legacy");
					await page.waitForSelector('div.container contents')
					await page.close;
				}, 300);
			} catch {
				console.log("Losho Sedlarov Losho");
			}
        }
}