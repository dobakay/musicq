"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoute_1 = require("../BaseRoute/BaseRoute");
const tsyringe_1 = require("tsyringe");
const youtubedl = require('youtube-dl');
const ffmpeg = require("fluent-ffmpeg");
const path = require('path');
const fs = require('fs-extra');
const EventEmitter = require('events');
var ytStream = require("youtube-audio-stream");
/**
 * "/youtube-download/:videoID" route
 *
 */
let StreamTubeRoute = class StreamTubeRoute extends BaseRoute_1.BaseRoute {
    /**
     * Constructor
     *
     * @class StreamTubeRoute
     * @constructor
     */
    // tslint:disable-next-line:typedef
    constructor(router) {
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
    download(req, res, next) {
        // this.downloadAudioToRoot(req, res);
        this.title = "MusiQ Download Tube";
        this.streamAudio(req, res, next);
    }
    streamAudio(req, res, next) {
        let videoID = req.params.videoID; //"ZTY8vlKO9hg";
        let videoURL = "https://www.youtube.com/watch?v=" + videoID;
        this.downloadWithYoutubeDl(videoURL, res);
    }
    /**
     * Download a single video with youtube-dl
     * @param url
     * @param outputFile
     * @return Event
     */
    downloadWithYoutubeDl(url, response, outputFile) {
        return __awaiter(this, void 0, void 0, function* () {
            // const stream = youtubedl(url, ['-f', 'bestaudio/best', '--no-check-certificate'], { maxBuffer: Infinity });
            var stream = youtubedl(url); //include youtbedl ... var youtubedl = require('ytdl');
            //set response headers
            // response.setHeader('Content-disposition', 'attachment; filename=' + title + '.mp3');
            response.setHeader('Content-type', 'audio/mpeg');
            //set stream for conversion
            var proc = new ffmpeg({ source: stream });
            proc.on('error', function (e) {
                console.log(e);
            });
            proc.on('end', function () {
                console.log('finished');
            });
            proc.on('error', function (e) {
                console.log(e);
            });
            proc.on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '% done');
            });
            proc.setFfmpegPath(path.resolve(__dirname + '../../../../youtube_dl/ffmpeg.exe'))
                .toFormat('mp3')
                .output(response).run();
        });
    }
    ;
    /**
     * Convert a outputFile in MP3
     * @param inputFile
     * @param outputFile
     * @param bitrate string
     * @return Event
     */
    convertInMP3(inputFile, response, outputFile, bitrate) {
        const convertEmitter = new EventEmitter();
        let aborted = false;
        let started = false;
        let convert = ffmpeg(inputFile);
        const onProgress = (progress) => {
            convertEmitter.emit('convert-progress', {
                progress: progress.percent,
            });
        };
        convert
            .audioBitrate(bitrate)
            .audioCodec('libmp3lame')
            .once('codecData', (_data) => {
            convertEmitter.emit('convert-start');
        })
            .on('progress', onProgress)
            .once('end', () => {
            convert.removeListener('progress', onProgress);
            fs.unlinkSync(inputFile);
            convertEmitter.emit('convert-end');
        })
            .once('error', (e) => {
            convert.removeListener('progress', onProgress);
            if (!aborted) {
                convertEmitter.emit('error', e);
            }
            else {
                if (fs.existsSync(inputFile)) {
                    fs.unlink(inputFile, () => { });
                }
                if (fs.existsSync(outputFile)) {
                    fs.unlink(outputFile, () => { });
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
    }
    ;
};
StreamTubeRoute = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject("Router")),
    __metadata("design:paramtypes", [Function])
], StreamTubeRoute);
exports.StreamTubeRoute = StreamTubeRoute;

//# sourceMappingURL=../../source_maps/routes/StreamTubeRoute/StreamTubeRoute.js.map
