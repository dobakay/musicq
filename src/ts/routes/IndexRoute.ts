import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "./BaseRoute";
import { injectable } from "tsyringe";

/**
 * "/" route
 *
 * @class IndexRoute
 */
@injectable()
export class IndexRoute extends BaseRoute {
     /**
      * Constructor
      *
      * @class IndexRoute
      * @constructor
      */
    // tslint:disable-next-line:typedef
    constructor(path = "/", router: Router) {
        super(path, router);
        this.router.get(this.path, (req: Request, res: Response, next: NextFunction) => {
            this.index(req, res, next);
        });
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
           res.sendfile("./dist/www/dist/index.html");
       }

}