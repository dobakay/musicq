import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
/**
 * "/youtube-download/:videoID" route
 *
 */
export declare class StreamTubeRoute extends BaseRoute {
    /**
     * Constructor
     *
     * @class StreamTubeRoute
     * @constructor
     */
    constructor(path: string | undefined, router: Router);
    /**
     * The tube download page route.
     *
     * @class StreamTubeRoute
     * @method download
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    download(req: Request, res: Response, next: NextFunction): void;
    streamAudio(req: Request, res: Response, next: NextFunction): void;
    downloadAudioToRoot(req: Request, res: Response, next: NextFunction): void;
}
