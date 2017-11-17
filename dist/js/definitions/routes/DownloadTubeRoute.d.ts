/// <reference types="express" />
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
/**
 * "/youtube-download" route
 *
 */
export declare class DownloadTubeRoute extends BaseRoute {
    /**
     * Create route
     *
     * @class DownloadTubeRoute
     * @method create
     * @param router {Router} The Express Router.
     * @static
     */
    static create(router: Router): void;
    /**
     * Constructor
     *
     * @class DownloadTubeRoute
     * @constructor
     */
    constructor();
    /**
     * The tube download page route.
     *
     * @class DownloadTubeRoute
     * @method download
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    download(req: Request, res: Response, next: NextFunction): void;
    streamAudio(req: Request, res: Response): void;
    downloadAudioToRoot(req: Request, res: Response): void;
}
