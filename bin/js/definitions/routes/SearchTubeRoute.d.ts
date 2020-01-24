import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
/**
 * "/" route
 *
 * @class SearchTubeRoute
 */
export declare class SearchTubeRoute extends BaseRoute {
    /**
     * Create the routes.
     *
     * @class SearchTubeRoute
     * @method create
     * @param router {Router} The Express Router.
     * @static
     */
    static create(router: Router): void;
    /**
     * Constructor
     *
     * @class SearchTubeRoute
     * @constructor
     */
    constructor();
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
    search(q: string, res: Response): Promise<void>;
}
