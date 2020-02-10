import { NextFunction, Request, Response, Router } from "express-serve-static-core";
import { BaseRoute } from "../BaseRoute/BaseRoute";
import { ISearchTubeRoute } from "./ISearchTubeRoute";
/**
 * "/search-youtube/?query" route
 *
 * @class SearchTubeRoute
 */
export declare class SearchTubeRoute extends BaseRoute implements ISearchTubeRoute {
    browser: any;
    path: string;
    all_videos: Set<any>;
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
    private sleep;
    search(q: string, response: Response): Promise<void>;
    private parse;
}
