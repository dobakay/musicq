import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "./BaseRoute";
import { spawn } from "child_process";
var fs = require("fs");

/**
 * "/youtube-download" route
 *
 */
export class DownloadTubeRoute extends BaseRoute {

    /**
     * Create route
     *
     * @class DownloadTubeRoute
     * @method create
     * @param router {Router} The Express Router.
     * @static
     */
    public static create(router: Router) {
        console.log("[DownloadTubeRoute::create] Creating youtube download route.");

        router.get("/youtube-download/", (req: Request, res: Response, next: NextFunction) => {
            new DownloadTubeRoute().download(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class DownloadTubeRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The tube download page route.
     *
     * @class DownloadTubeRoute
     * @method download
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public download(req: Request, res: Response, next: NextFunction) {

        this.title = "MusiQ Download Tube";

        let video_URL = "https://www.youtube.com/watch?v=${ req.params.videoID }"
        const tube_dl = spawn('../youtube-dl/youtube-dl', [' --extract-audio', '--audio-format', 'mp3 ', video_URL]);

        tube_dl.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        tube_dl.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        tube_dl.on('exit', (code) => {
            console.log('Arguments:');
            console.log(this);
            console.log('TUBE_DL child process:');
            console.log(tube_dl);
            console.log('End of LOG');

            fs.readFile("./#{req.params.videoID}.mp3", (err: Error, data: any) => {
                // We set our content type so consumers of our API know what they are getting
                res.setHeader('Content-Type', 'audio/mpeg3');
                res.send(data);
            });
        });

        tube_dl.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });


        // # Spawn a child process to obtain FLV and use ffmpeg to convert it.
        //     youtube_dl = spawn './youtube-dl', ['--extract-audio', '--audio-format', 'mp3', "http://www.youtube.com/watch?v=#{req.params.youtube_video_id}"]

        // # Let's echo the output of the child to see what's going on
        // youtube_dl.stdout.on 'data', (data) ->
        //     console.log data.toString()
        // # Incase something bad happens, we should write that out too.
        //     youtube_dl.stderr.on 'data', (data) ->
        //         process.stderr.write data
        // # when we're done, let's send back the output
        // youtube_dl.on 'exit', ->
        //     readFile "./#{req.params.youtube_video_id}.mp3", (err, data) ->
        // # We set our content type so consumers of our API know what they are getting
        // res.send data, { 'Content-Type': 'audio/mpeg3' }

    }

}