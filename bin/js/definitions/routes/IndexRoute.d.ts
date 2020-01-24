import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
/**
 * "/" route
 *
 * @class IndexRoute
 */
export declare class IndexRoute extends BaseRoute {
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor(path: string | undefined, router: Router);
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    index(req: Request, res: Response, next: NextFunction): void;
}
