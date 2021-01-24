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
    /**
     * Search a query on YouTube and return the detailed results
     * @param query string
     * @param regionCode string ISO 3166-1 alpha-2 country code (ex: FR, US)
     * @param relevanceLanguage string ISO 639-1 two-letter language code (ex: en: fr)
     * @param v boolean Verbosity
     * @return Promise
     */
    search(query: string, response: Response, regionCode?: string, relevanceLanguage?: string, v?: Boolean): any;
}
