import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "./BaseRoute";

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
           console.log(req.query);
       }

}