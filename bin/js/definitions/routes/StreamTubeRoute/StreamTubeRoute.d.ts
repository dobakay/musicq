import { NextFunction, Request, Response, Router } from "express-serve-static-core";
import { BaseRoute } from "../BaseRoute/BaseRoute";
import { IStreamTubeRoute } from "./IStreamTubeRoute";
/**
 * "/youtube-download/:videoID" route
 *
 */
export declare class StreamTubeRoute extends BaseRoute implements IStreamTubeRoute {
    path: string;
    /**
     * Constructor
     *
     * @class StreamTubeRoute
     * @constructor
     */
    constructor(router: Router);
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
    /**
     * Download a single video with youtube-dl
     * @param url
     * @param outputFile
     * @return Event
     */
    private downloadWithYoutubeDl;
    /**
     * Convert a outputFile in MP3
     * @param inputFile
     * @param outputFile
     * @param bitrate string
     * @return Event
     */
    private convertInMP3;
}
