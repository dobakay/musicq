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
var DownloadTubeRoute = /** @class */ (function (_super) {
    __extends(DownloadTubeRoute, _super);
    /**
     * Constructor
     *
     * @class DownloadTubeRoute
     * @constructor
     */
    function DownloadTubeRoute() {
        return _super.call(this) || this;
    }
    /**
     * Create route
     *
     * @class DownloadTubeRoute
     * @method create
     * @param router {Router} The Express Router.
     * @static
     */
    DownloadTubeRoute.create = function (router) {
        console.log("[DownloadTubeRoute::create] Creating youtube download route.");
        router.get("/youtube-download/:videoID", function (req, res, next) {
            new DownloadTubeRoute().download(req, res, next);
        });
    };
    /**
     * The tube download page route.
     *
     * @class DownloadTubeRoute
     * @method download
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    DownloadTubeRoute.prototype.download = function (req, res, next) {
        // this.downloadAudioToRoot(req, res);
        this.title = "MusiQ Download Tube";
        this.streamAudio(req, res, next);
    };
    DownloadTubeRoute.prototype.streamAudio = function (req, res, next) {
        var videoID = req.params.videoID; //"ZTY8vlKO9hg";
        var videoURL = "http://www.youtube.com/watch?v=" + videoID;
        ytStream(videoURL).pipe(res);
        // let youtubeDlUrl: string = "";
        // let decoder = new StringDecoder("utf8");
        // let options = { encoding: "utf8"};
        // // # Spawn a child process to obtain the URL to the FLV(to the youtube vid)
        // let youtubeDlUrlChild = exec("\.\\dist\\youtube_dl\\youtube-dl --simulate --get-url " + videoURL, (err, stdout, stderr) => {
        //     console.log(stderr.toString());
        //     //Converting the buffer to a string is a little costly so let's do it upfront
        //     youtubeDlUrl = stdout.toString();
        //     // there's a trailing '\n' returned from youtube-dl, let's cut it off
        //     youtubeDlUrl = youtubeDlUrl.substring(0, youtubeDlUrl.length - 2);
        //     res.contentType("audio/mpeg3");
        //     let ffmpegChild = spawn("ffmpeg", ["-i", "pipe:0", "-acodec", "libmp3lame", "-f", "mp3", "-"]);
        //     ffmpegChild.stdout.pipe(res);
        //     try {
        //         var webhook = "http://www.youtube.com/";
        //         request({ url: youtubeDlUrl, uri: webhook, headers: { "Youtubedl-no-compression": "True" } }).pipe(ffmpegChild.stdin);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // });
    };
    DownloadTubeRoute.prototype.downloadAudioToRoot = function (req, res, next) {
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
    return DownloadTubeRoute;
}(BaseRoute_1.BaseRoute));
exports.DownloadTubeRoute = DownloadTubeRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxrQ0FBa0U7QUFDbEUsaURBQStDO0FBRS9DLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV2Qjs7O0dBR0c7QUFDSDtJQUF1QyxxQ0FBUztJQWtCNUM7Ozs7O09BS0c7SUFDSDtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQXhCRDs7Ozs7OztPQU9HO0lBQ1csd0JBQU0sR0FBcEIsVUFBcUIsTUFBYztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFFNUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDckYsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQVlEOzs7Ozs7OztPQVFHO0lBQ0ksb0NBQVEsR0FBZixVQUFnQixHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQzNELHNDQUFzQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUM5RCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQjtRQUNsRCxJQUFJLFFBQVEsR0FBRyxpQ0FBaUMsR0FBRyxPQUFPLENBQUM7UUFDM0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixpQ0FBaUM7UUFDakMsMkNBQTJDO1FBQzNDLHFDQUFxQztRQUVyQyw4RUFBOEU7UUFDOUUsK0hBQStIO1FBQy9ILHNDQUFzQztRQUN0QyxvRkFBb0Y7UUFDcEYsd0NBQXdDO1FBQ3hDLDRFQUE0RTtRQUM1RSx5RUFBeUU7UUFDekUsc0NBQXNDO1FBQ3RDLHNHQUFzRztRQUN0RyxvQ0FBb0M7UUFDcEMsWUFBWTtRQUNaLG1EQUFtRDtRQUNuRCxpSUFBaUk7UUFDakksd0JBQXdCO1FBQ3hCLDhCQUE4QjtRQUM5QixRQUFRO1FBQ1IsTUFBTTtJQUVWLENBQUM7SUFFTSwrQ0FBbUIsR0FBMUIsVUFBMkIsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUV0RSxJQUFJLFFBQVEsR0FBRyxxQ0FBb0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFTLENBQUM7UUFFeEUsSUFBSSxNQUFNLEdBQUcscUJBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVuSSxJQUFJLE9BQU8sR0FBRyxJQUFJLDhCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFlLENBQUM7UUFDcEIsSUFBSSxRQUFnQixDQUFDO1FBRXJCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQVk7WUFDbEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhDLFFBQVEsR0FBRyxxQ0FBNkIsQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLFNBQU0sQ0FBQyxDQUFDO2dCQUNqRyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFpQixRQUFVLENBQUMsQ0FBQztZQUM3QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQUk7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFXLElBQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJO1lBQ25CLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBSyxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLFNBQU0sRUFBRSxVQUFDLEdBQVUsRUFBRSxJQUFTO2dCQUN4RSw2RUFBNkU7Z0JBQzdFLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLElBQUksRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsSUFBSTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFrQyxJQUFNLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCx3QkFBQztBQUFELENBakhBLEFBaUhDLENBakhzQyxxQkFBUyxHQWlIL0M7QUFqSFksOENBQWlCIiwiZmlsZSI6InJvdXRlcy9Eb3dubG9hZFR1YmVSb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQge0Jhc2VSb3V0ZX0gZnJvbSBcIi4vQmFzZVJvdXRlXCI7XHJcbmltcG9ydCB7IHNwYXduLCBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuaW1wb3J0IHsgZnJvbURpciwgZ2V0U3ViU3RyaW5nQmV0d2VlblR3b1N0cmluZ3MgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgU3RyaW5nRGVjb2RlciB9IGZyb20gXCJzdHJpbmdfZGVjb2RlclwiO1xyXG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gXCJyZXF1ZXN0XCI7XHJcbnZhciB5dFN0cmVhbSA9IHJlcXVpcmUoXCJ5b3V0dWJlLWF1ZGlvLXN0cmVhbVwiKTtcclxudmFyIGZzID0gcmVxdWlyZShcImZzXCIpO1xyXG5cclxuLyoqXHJcbiAqIFwiL3lvdXR1YmUtZG93bmxvYWRcIiByb3V0ZVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERvd25sb2FkVHViZVJvdXRlIGV4dGVuZHMgQmFzZVJvdXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSByb3V0ZVxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSByb3V0ZXIge1JvdXRlcn0gVGhlIEV4cHJlc3MgUm91dGVyLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShyb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0Rvd25sb2FkVHViZVJvdXRlOjpjcmVhdGVdIENyZWF0aW5nIHlvdXR1YmUgZG93bmxvYWQgcm91dGUuXCIpO1xyXG5cclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3lvdXR1YmUtZG93bmxvYWQvOnZpZGVvSURcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBEb3dubG9hZFR1YmVSb3V0ZSgpLmRvd25sb2FkKHJlcSwgcmVzLCBuZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIERvd25sb2FkVHViZVJvdXRlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0dWJlIGRvd25sb2FkIHBhZ2Ugcm91dGUuXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIERvd25sb2FkVHViZVJvdXRlXHJcbiAgICAgKiBAbWV0aG9kIGRvd25sb2FkXHJcbiAgICAgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgRXhwcmVzcyBSZXF1ZXN0IG9iamVjdC5cclxuICAgICAqIEBwYXJhbSByZXMge1Jlc3BvbnNlfSBUaGUgRXhwcmVzcyBSZXNwb25zZSBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gbmV4dCB7TmV4dEZ1bmN0aW9ufSBFeGVjdXRlIHRoZSBuZXh0IG1ldGhvZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvd25sb2FkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLy8gdGhpcy5kb3dubG9hZEF1ZGlvVG9Sb290KHJlcSwgcmVzKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJNdXNpUSBEb3dubG9hZCBUdWJlXCI7XHJcbiAgICAgICAgdGhpcy5zdHJlYW1BdWRpbyhyZXEsIHJlcywgbmV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cmVhbUF1ZGlvKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHZpZGVvSUQgPSByZXEucGFyYW1zLnZpZGVvSUQ7IC8vXCJaVFk4dmxLTzloZ1wiO1xyXG4gICAgICAgIGxldCB2aWRlb1VSTCA9IFwiaHR0cDovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PVwiICsgdmlkZW9JRDtcclxuICAgICAgICB5dFN0cmVhbSh2aWRlb1VSTCkucGlwZShyZXMpO1xyXG4gICAgICAgIC8vIGxldCB5b3V0dWJlRGxVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgLy8gbGV0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihcInV0ZjhcIik7XHJcbiAgICAgICAgLy8gbGV0IG9wdGlvbnMgPSB7IGVuY29kaW5nOiBcInV0ZjhcIn07XHJcblxyXG4gICAgICAgIC8vIC8vICMgU3Bhd24gYSBjaGlsZCBwcm9jZXNzIHRvIG9idGFpbiB0aGUgVVJMIHRvIHRoZSBGTFYodG8gdGhlIHlvdXR1YmUgdmlkKVxyXG4gICAgICAgIC8vIGxldCB5b3V0dWJlRGxVcmxDaGlsZCA9IGV4ZWMoXCJcXC5cXFxcZGlzdFxcXFx5b3V0dWJlX2RsXFxcXHlvdXR1YmUtZGwgLS1zaW11bGF0ZSAtLWdldC11cmwgXCIgKyB2aWRlb1VSTCwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc3RkZXJyLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIC8vICAgICAvL0NvbnZlcnRpbmcgdGhlIGJ1ZmZlciB0byBhIHN0cmluZyBpcyBhIGxpdHRsZSBjb3N0bHkgc28gbGV0J3MgZG8gaXQgdXBmcm9udFxyXG4gICAgICAgIC8vICAgICB5b3V0dWJlRGxVcmwgPSBzdGRvdXQudG9TdHJpbmcoKTtcclxuICAgICAgICAvLyAgICAgLy8gdGhlcmUncyBhIHRyYWlsaW5nICdcXG4nIHJldHVybmVkIGZyb20geW91dHViZS1kbCwgbGV0J3MgY3V0IGl0IG9mZlxyXG4gICAgICAgIC8vICAgICB5b3V0dWJlRGxVcmwgPSB5b3V0dWJlRGxVcmwuc3Vic3RyaW5nKDAsIHlvdXR1YmVEbFVybC5sZW5ndGggLSAyKTtcclxuICAgICAgICAvLyAgICAgcmVzLmNvbnRlbnRUeXBlKFwiYXVkaW8vbXBlZzNcIik7XHJcbiAgICAgICAgLy8gICAgIGxldCBmZm1wZWdDaGlsZCA9IHNwYXduKFwiZmZtcGVnXCIsIFtcIi1pXCIsIFwicGlwZTowXCIsIFwiLWFjb2RlY1wiLCBcImxpYm1wM2xhbWVcIiwgXCItZlwiLCBcIm1wM1wiLCBcIi1cIl0pO1xyXG4gICAgICAgIC8vICAgICBmZm1wZWdDaGlsZC5zdGRvdXQucGlwZShyZXMpO1xyXG4gICAgICAgIC8vICAgICB0cnkge1xyXG4gICAgICAgIC8vICAgICAgICAgdmFyIHdlYmhvb2sgPSBcImh0dHA6Ly93d3cueW91dHViZS5jb20vXCI7XHJcbiAgICAgICAgLy8gICAgICAgICByZXF1ZXN0KHsgdXJsOiB5b3V0dWJlRGxVcmwsIHVyaTogd2ViaG9vaywgaGVhZGVyczogeyBcIllvdXR1YmVkbC1uby1jb21wcmVzc2lvblwiOiBcIlRydWVcIiB9IH0pLnBpcGUoZmZtcGVnQ2hpbGQuc3RkaW4pO1xyXG4gICAgICAgIC8vICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb3dubG9hZEF1ZGlvVG9Sb290KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIGxldCB2aWRlb1VSTCA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSR7IHJlcS5wYXJhbXMudmlkZW9JRH1gO1xyXG5cclxuICAgICAgICBsZXQgdHViZURsID0gc3Bhd24oXCIuL2Rpc3QveW91dHViZV9kbC95b3V0dWJlLWRsXCIsIFtcIi0tZXh0cmFjdC1hdWRpb1wiLCBcIi0tYXVkaW8tZm9ybWF0XCIsIFwibXAzXCIsIFwiLS1hdWRpby1xdWFsaXR5XCIsIFwiOVwiLCB2aWRlb1VSTF0pO1xyXG5cclxuICAgICAgICBsZXQgZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKFwidXRmOFwiKTtcclxuICAgICAgICBsZXQgZGF0YVN0cjogc3RyaW5nO1xyXG4gICAgICAgIGxldCBmaWxlTmFtZTogc3RyaW5nO1xyXG5cclxuICAgICAgICB0dWJlRGwuc3Rkb3V0Lm9uKFwiZGF0YVwiLCAoZGF0YTogQnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFTdHIgPSBkZWNvZGVyLndyaXRlKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVN0ci5pbmRleE9mKFwibXAzXCIpICE9PSAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gZ2V0U3ViU3RyaW5nQmV0d2VlblR3b1N0cmluZ3MoZGF0YVN0ciwgXCJEZXN0aW5hdGlvbjogXCIsIGAtJHtyZXEucGFyYW1zLnZpZGVvSUR9Lm1wM2ApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZJTEUgTkFNRSBJWjogJHtmaWxlTmFtZX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlRGwuc3Rkb3V0Lm9uKFwiZW5kXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVN0cik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVEbC5zdGRlcnIub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7ZGF0YX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZURsLm9uKFwiZXhpdFwiLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICBmcy5yZWFkRmlsZShgLi8ke2ZpbGVOYW1lfSR7cmVxLnBhcmFtcy52aWRlb0lEfS5tcDNgLCAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBzZXQgb3VyIGNvbnRlbnQgdHlwZSBzbyBjb25zdW1lcnMgb2Ygb3VyIEFQSSBrbm93IHdoYXQgdGhleSBhcmUgZ2V0dGluZ1xyXG4gICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImF1ZGlvL21wZWczXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlRGwub24oXCJjbG9zZVwiLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY2hpbGQgcHJvY2VzcyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXHNyYyJ9
