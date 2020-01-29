import { NextFunction, Request, Response, Router } from "express-serve-static-core";
import { BaseRoute } from "../BaseRoute/BaseRoute";
import { IIndexRoute } from "./IIndexRoute";
/**
 * "/" route
 *
 * @class IndexRoute
 */
export declare class IndexRoute extends BaseRoute implements IIndexRoute {
    protected path: string;
    /**
     * Constructor
     *
     * @class IndexRoute
     */
    constructor(router: Router);
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
