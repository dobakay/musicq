import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "../BaseRoute/BaseRoute";
import * as puppeteer from "puppeteer";
import { autoInjectable } from "tsyringe";

/**
 * "/search-youtube/?query" route
 *
 * @class SearchTubeRoute
 */
@autoInjectable()
export class SearchTubeRoute extends BaseRoute {
    browser: any;
    path: string;
    /**
      * Constructor
      *
      * @class SearchTubeRoute
      * @constructor
      */
    // tslint:disable-next-line:typedef
    constructor(router: Router) {
            super(router);
            this.path = "/search-youtube/";
            this.router.get(this.path.toString(), (req: Request, res: Response, next: NextFunction) => {
                this.index(req, res, next);
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
           this.title = "MusiqQ Home";

           //set options
        //    console.log(req.query.q);
           this.search(req.query.q, res);
       }

       async search(q: string, response: Response) {
            const page = await this.browser.newPage();
            let json;
            page.on("response", async (res: Response) => {
                json = await res.json();
                response.send(json);
            });
            page.on("error", (er: Error) => {
                console.log(er);
            });
            page.on("close", (e: Event) => {
                response.send({
                    serverEvent: JSON.stringify(e),
                    msg: "search page was closed"
                });
            });
            await page.goto("https://youtube.com");
            await page.type("#search", q);
            await page.click("button#search-icon-legacy");
            await page.close;
        }
}