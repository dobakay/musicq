import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "./BaseRoute";

/**
 * "/" route
 * 
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {
    /**
     * Create the routes.
     * 
     * @class IndexRoute
     * @method create
     * @param router {Router} The Express Router.
     * @static
     */
     public static create(router: Router) {
         console.log("[IndexRouter::create] Creating index route.");

         router.get("/", (req: Request, res: Response, next: NextFunction) => {
             new IndexRoute().index(req, res, next);
         });
     }

     /**
      * Constructor
      *
      * @class IndexRoute
      * @costructor
      */
      constructor() {
          super();
      }

      /**
       * The home page route.
       *
       * @class IndexRoute
       * @method index
       * @param req {Request} The Express Request object.
       * @param res {Response} The Express Response object.
       * @param next {NextFunction} Execute the next method.
       */
       public index(req: Request, res: Response, next: NextFunction) {
           // set custom title
           this.title = "MusiqQ Home";

           //set options
           let options: Object = {
               "message": "Welcome to MusicQ. Your party friend."
           };

           // render template
           this.render(req, res,"index", options);
       }

}