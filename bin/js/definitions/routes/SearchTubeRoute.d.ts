import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
/**
 * "/search-youtube/?query" route
 *
 * @class SearchTubeRoute
 */
export declare class SearchTubeRoute extends BaseRoute {
    browser: any;
    path: string;
    /**
      * Constructor
      *
      * @class SearchTubeRoute
      * @constructor
      */
    constructor(router: Router);
    /**
     * The home page route.
     *
     * @class SearchTubeRoute
     * @method index
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    index(req: Request, res: Response, next: NextFunction): void;
    search(q: string, response: Response): Promise<void>;
}
