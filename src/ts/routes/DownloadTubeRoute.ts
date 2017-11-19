import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "./BaseRoute";
import { spawn, exec } from "child_process";
import { fromDir, getSubStringBetweenTwoStrings } from "../utils";
import { StringDecoder } from 'string_decoder';
import * as request from 'request';
var fs = require('fs');

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

        router.get("/youtube-download/:videoID", (req: Request, res: Response, next: NextFunction) => {
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
        // this.downloadAudioToRoot(req, res);
        this.title = "MusiQ Download Tube";
        this.streamAudio(req, res);
        next();
    }

    public streamAudio(req: Request, res: Response) {
        let video_URL = `http://www.youtube.com/watch?v=${req.params.videoID}`;
        let youtubeDlUrl:string = '';
        let decoder = new StringDecoder('utf8');
        let options = { encoding: 'utf8'};

        // # Spawn a child process to obtain the URL to the FLV(to the youtube vid)
        let youtubeDlUrlChild = spawn('./dist/youtube_dl/youtube-dl', ['--simulate', '--get-url', video_URL]);
        youtubeDlUrlChild.stdout.on('data', (data:Buffer) => {
            youtubeDlUrl += decoder.write(data);
        });

        youtubeDlUrlChild.stdout.on('end', () => {
            //Converting the buffer to a string is a little costly so let's do it upfront
            youtubeDlUrl = youtubeDlUrl.substring(0, youtubeDlUrl.length - 1);
            console.log(`SIE URL IZ: ${youtubeDlUrl}`);
            // # Before we write the output, ensure that we're sending it back with the proper content type
            // # Create an ffmpeg process to feed the video to.
            let ffmpeg_child = spawn ("ffmpeg", ['-i', 'pipe:0', '-acodec', /*'libmp3lame',*/ '-f', 'mp3', '-']);
            // # Setting up the output pipe before we set up the input pipe ensures wedon't loose any data.
            ffmpeg_child.stdout.pipe(res);
            // # GET the FLV, pipe the response's body to our ffmpeg process.
            request({
                uri: youtubeDlUrl,
                headers: {
                    'Youtubedl-no-compression': 'True',
                    'Content-Type': 'audio/mpeg3'
                },
                method: 'GET'
            }).pipe(ffmpeg_child.stdin);
        })
    }

    public downloadAudioToRoot(req: Request, res: Response) {

        let video_URL = `https://www.youtube.com/watch?v=${ req.params.videoID}`;

        let tube_dl = spawn('./dist/youtube_dl/youtube-dl', ['--extract-audio', '--audio-format', 'mp3', '--audio-quality', '9', video_URL]);

        let decoder = new StringDecoder('utf8');
        let dataStr:string;
        let fileName:string;

        tube_dl.stdout.on('data', (data: Buffer) => {
            dataStr = decoder.write(data);
            if(dataStr.indexOf('mp3') !== -1) {

                fileName = getSubStringBetweenTwoStrings(dataStr, 'Destination: ', `-${req.params.videoID}.mp3`);
                console.log(`FILE NAME IZ: ${fileName}`);
            }
        });

        tube_dl.stdout.on('end', () => {
            console.log(dataStr);
        });

        tube_dl.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        tube_dl.on('exit', (code) => {
            fs.readFile(`./${fileName}${req.params.videoID}.mp3`, (err: Error, data: any) => {
                // We set our content type so consumers of our API know what they are getting
                res.setHeader('Content-Type', 'audio/mpeg3');
                res.send(data);
            });
        });

        tube_dl.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

    }

}