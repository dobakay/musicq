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
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoute_1 = require("../BaseRoute/BaseRoute");
const child_process_1 = require("child_process");
const utils_1 = require("../../utils");
const string_decoder_1 = require("string_decoder");
const tsyringe_1 = require("tsyringe");
var ytStream = require("youtube-audio-stream");
var fs = require("fs");
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
        this.router.get(this.path, this.download);
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
        let videoURL = "http://www.youtube.com/watch?v=" + videoID;
        ytStream(videoURL).pipe(res);
    }
    downloadAudioToRoot(req, res, next) {
        let videoURL = `https://www.youtube.com/watch?v=${req.params.videoID}`;
        let tubeDl = child_process_1.spawn("./dist/youtube_dl/youtube-dl", ["--extract-audio", "--audio-format", "mp3", "--audio-quality", "9", videoURL]);
        let decoder = new string_decoder_1.StringDecoder("utf8");
        let dataStr;
        let fileName;
        tubeDl.stdout.on("data", (data) => {
            dataStr = decoder.write(data);
            if (dataStr.indexOf("mp3") !== -1) {
                fileName = utils_1.getSubStringBetweenTwoStrings(dataStr, "Destination: ", `-${req.params.videoID}.mp3`);
                console.log(`FILE NAME IZ: ${fileName}`);
            }
        });
        tubeDl.stdout.on("end", () => {
            console.log(dataStr);
        });
        tubeDl.stderr.on("data", (data) => {
            console.log(`stderr: ${data}`);
        });
        tubeDl.on("exit", (code) => {
            fs.readFile(`./${fileName}${req.params.videoID}.mp3`, (err, data) => {
                // We set our content type so consumers of our API know what they are getting
                res.setHeader("Content-Type", "audio/mpeg3");
                res.send(data);
                next();
            });
        });
        tubeDl.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
};
StreamTubeRoute = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject("Router")),
    __metadata("design:paramtypes", [Function])
], StreamTubeRoute);
exports.StreamTubeRoute = StreamTubeRoute;

//# sourceMappingURL=../../source_maps/routes/StreamTubeRoute/StreamTubeRoute.js.map
