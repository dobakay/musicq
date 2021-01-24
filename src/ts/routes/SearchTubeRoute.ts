import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "./BaseRoute";
import * as puppeteer from 'puppeteer';

/**
 * "/" route
 *
 * @class SearchTubeRoute
 */
export class SearchTubeRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class SearchTubeRoute
     * @method create
     * @param router {Router} The Express Router.
     * @static
     */
     public static create(router: Router) {
         console.log("[SearchTubeRoute::create] Creating index route.");

         router.get("/search-youtube/", (req: Request, res: Response, next: NextFunction) => {
             new SearchTubeRoute().index(req, res, next);
         });
     }

     /**
      * Constructor
      *
      * @class SearchTubeRoute
      * @constructor
      */
      constructor() {
          super();
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
           console.log(req.query.q);
           this.search(req.query.q, res);
       }

       async search(q:string, res:Response) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://youtube.com');
        await page.type('#search', q);
        await page.click('button#search-icon-legacy');
        let json;
        page.on('response', async (res) => {
            json = await res.json();
        });
        await page.waitForSelector('ytd-thumbnail.ytd-video-renderer')
        const videos = await page.$$('ytd-thumbnail.ytd-video-renderer');
        await browser.close();
        res.send(json);
      }

}