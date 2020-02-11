import { NextFunction, Request, Response, Router } from "express-serve-static-core";
import {BaseRoute} from "../BaseRoute/BaseRoute";
import {IStreamTubeRoute} from "./IStreamTubeRoute";
import { spawn, exec } from "child_process";
import { fromDir, getSubStringBetweenTwoStrings } from "../../utils";
import { StringDecoder } from "string_decoder";
import { injectable, inject } from "tsyringe";
const youtubedl = require('youtube-dl');
const ffmpeg = require("fluent-ffmpeg")
const path = require('path');
const fs = require('fs-extra');
const EventEmitter = require('events');

var ytStream = require("youtube-audio-stream");

/**
 * "/youtube-download/:videoID" route
 *
 */
@injectable()
export class StreamTubeRoute extends BaseRoute implements IStreamTubeRoute {
    path: string;
    /**
     * Constructor
     *
     * @class StreamTubeRoute
     * @constructor
     */
    // tslint:disable-next-line:typedef
    constructor(@inject("Router") router: Router) {
        super(router);
        this.path = "/youtube-download/:videoID";
        this.router.get(this.path, (req, res, next) => {
			this.download.call(this, req, res, next);
		});
    }

    /**
     * The tube download page route.
     *
     * @class StreamTubeRoute
     * @method download
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    public download(req: Request, res: Response, next: NextFunction) {
        // this.downloadAudioToRoot(req, res);
        this.title = "MusiQ Download Tube";
        this.streamAudio(req, res, next);
    }

    public streamAudio(req: Request, res: Response, next: NextFunction) {
        let videoID = req.params.videoID; //"ZTY8vlKO9hg";
        let videoURL = "https://www.youtube.com/watch?v=" + videoID;
        this.downloadWithYoutubeDl(videoURL, req,  res);
    }

    /**
     * Download a single video with youtube-dl
     * @param url
     * @param outputFile
     * @return Event
     */
    private async downloadWithYoutubeDl(url: string, request: Request, response: Response, outputFile?: any) {
        // const stream = youtubedl(url, ['-f', 'bestaudio/best', '--no-check-certificate'], { maxBuffer: Infinity });
        var stream = youtubedl(url); //include youtbedl ... var youtubedl = require('ytdl');
        
        //set response headers
        // response.setHeader('Content-disposition', 'attachment; filename=' + title + '.mp3');
        response.setHeader('Content-type', 'audio/mpeg');
        
        //set stream for conversion
        var proc = new ffmpeg({source: stream});
        proc.on('error', function (e:any) {
            console.log(e);
        });
        proc.on('end', function() {
            console.log('finished');
        });
        proc.on('error', function (e:any) {
            console.log(e);
        });
        proc.on('progress', function(progress: any) {
            console.log('Processing: ' + progress.percent + '% done');
        });
        proc.setFfmpegPath(path.resolve(__dirname + '../../../../youtube_dl/ffmpeg.exe'))
            .toFormat('mp3')
            .output(response).run();

        request.connection.on('close',function(){    
            // code to handle connection abort
            console.log('user cancelled');
            proc.kill();
        });
    };

    /**
     * Convert a outputFile in MP3
     * @param inputFile
     * @param outputFile
     * @param bitrate string
     * @return Event
     */
    private convertInMP3(inputFile: any, response: Response, outputFile: any, bitrate: ArrayBuffer) {
        const convertEmitter = new EventEmitter();
        let aborted = false;
        let started = false;
    
        let convert = ffmpeg(inputFile);
        const onProgress = (progress: any) => {
        convertEmitter.emit('convert-progress', {
            progress: progress.percent,
        });
        };
    
        convert
        .audioBitrate(bitrate)
        .audioCodec('libmp3lame')
        .once('codecData', (_data: any) => {
            convertEmitter.emit('convert-start');
        })
        .on('progress', onProgress)
        .once('end', () => {
            convert.removeListener('progress', onProgress);
            fs.unlinkSync(inputFile);
            convertEmitter.emit('convert-end');
        })
        .once('error', (e: Error) => {
            convert.removeListener('progress', onProgress);
            if (!aborted) {
            convertEmitter.emit('error', e);
            } else {
            if (fs.existsSync(inputFile)) {
                fs.unlink(inputFile, () => {});
            }
            if (fs.existsSync(outputFile)) {
                fs.unlink(outputFile, () => {});
            }
            }
        })
        .once('start', () => {
            started = true;
            if (aborted) {
            abort();
            }
        })
        .save(outputFile);
    
        const abort = () => {
        aborted = true;
        if (started) {
            convert.kill();
        }
        };
    
        convertEmitter.once('abort', abort);
    
        return convertEmitter;
    };

    // downloadSingleURL = (url, outputFile, bitrate) => {
    //     const progressEmitter = new EventEmitter();
    //     let tempFile = outputFile + '.video';
    //     let downloadEnded = false;
    //     let convert;
      
    //     const dl = at3.downloadWithYoutubeDl(url, tempFile);
    //     const onDlProgress = (infos) => {
    //       progressEmitter.emit('download', {
    //         progress: infos.progress,
    //       });
    //     };
      
    //     dl.once('download-start', () => {
    //       progressEmitter.emit('start');
    //     });
    //     dl.on('download-progress', onDlProgress);
      
    //     dl.once('download-end', () => {
    //       downloadEnded = true;
    //       dl.removeListener('download-progress', onDlProgress);
    //       progressEmitter.emit('download-end');
      
    //       convert = at3.convertInMP3(tempFile, outputFile, bitrate);
    //       const onConvertProgress = (infos) => {
    //         progressEmitter.emit('convert', {
    //           progress: infos.progress,
    //         });
    //       };
    //       convert.on('convert-progress', onConvertProgress);
    //       convert.once('convert-end', () => {
    //         convert.removeListener('convert-progress', onConvertProgress);
    //         progressEmitter.emit('end');
    //       });
    //       convert.once('error', (error) => {
    //         progressEmitter.emit('error', error);
    //       });
    //     });
      
    //     dl.once('error', (error) => {
    //       dl.removeListener('download-progress', onDlProgress);
    //       progressEmitter.emit('error', new Error(error));
    //     });
      
    //     progressEmitter.once('abort', () => {
    //       if (!downloadEnded) {
    //         dl.emit('abort');
    //       } else {
    //         convert.emit('abort');
    //       }
    //     });
}