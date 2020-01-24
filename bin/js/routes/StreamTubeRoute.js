"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseRoute_1 = require("./BaseRoute");
var child_process_1 = require("child_process");
var utils_1 = require("../utils");
var string_decoder_1 = require("string_decoder");
var ytStream = require("youtube-audio-stream");
var fs = require("fs");
/**
 * "/youtube-download" route
 *
 */
var StreamTubeRoute = /** @class */ (function (_super) {
    __extends(StreamTubeRoute, _super);
    /**
     * Constructor
     *
     * @class StreamTubeRoute
     * @constructor
     */
    function StreamTubeRoute() {
        return _super.call(this) || this;
    }
    /**
     * Create route
     *
     * @class StreamTubeRoute
     * @method create
     * @param router {Router} The Express Router.
     * @static
     */
    StreamTubeRoute.create = function (router) {
        console.log("[StreamTubeRoute::create] Creating youtube download route.");
        router.get("/youtube-download/:videoID", function (req, res, next) {
            new StreamTubeRoute().download(req, res, next);
        });
    };
    /**
     * The tube download page route.
     *
     * @class StreamTubeRoute
     * @method download
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    StreamTubeRoute.prototype.download = function (req, res, next) {
        // this.downloadAudioToRoot(req, res);
        this.title = "MusiQ Download Tube";
        this.streamAudio(req, res, next);
    };
    StreamTubeRoute.prototype.streamAudio = function (req, res, next) {
        var videoID = req.params.videoID; //"ZTY8vlKO9hg";
        var videoURL = "http://www.youtube.com/watch?v=" + videoID;
        ytStream(videoURL).pipe(res);
    };
    StreamTubeRoute.prototype.downloadAudioToRoot = function (req, res, next) {
        var videoURL = "https://www.youtube.com/watch?v=" + req.params.videoID;
        var tubeDl = child_process_1.spawn("./dist/youtube_dl/youtube-dl", ["--extract-audio", "--audio-format", "mp3", "--audio-quality", "9", videoURL]);
        var decoder = new string_decoder_1.StringDecoder("utf8");
        var dataStr;
        var fileName;
        tubeDl.stdout.on("data", function (data) {
            dataStr = decoder.write(data);
            if (dataStr.indexOf("mp3") !== -1) {
                fileName = utils_1.getSubStringBetweenTwoStrings(dataStr, "Destination: ", "-" + req.params.videoID + ".mp3");
                console.log("FILE NAME IZ: " + fileName);
            }
        });
        tubeDl.stdout.on("end", function () {
            console.log(dataStr);
        });
        tubeDl.stderr.on("data", function (data) {
            console.log("stderr: " + data);
        });
        tubeDl.on("exit", function (code) {
            fs.readFile("./" + fileName + req.params.videoID + ".mp3", function (err, data) {
                // We set our content type so consumers of our API know what they are getting
                res.setHeader("Content-Type", "audio/mpeg3");
                res.send(data);
                next();
            });
        });
        tubeDl.on("close", function (code) {
            console.log("child process exited with code " + code);
        });
    };
    return StreamTubeRoute;
}(BaseRoute_1.BaseRoute));
exports.StreamTubeRoute = StreamTubeRoute;

//# sourceMappingURL=../source_maps/routes/StreamTubeRoute.js.map
