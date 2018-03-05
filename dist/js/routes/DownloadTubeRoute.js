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
var request = require("request");
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
        var youtubeDlUrl = "";
        var decoder = new string_decoder_1.StringDecoder("utf8");
        var options = { encoding: "utf8" };
        // # Spawn a child process to obtain the URL to the FLV(to the youtube vid)
        var youtubeDlUrlChild = child_process_1.exec("\.\\dist\\youtube_dl\\youtube-dl --simulate --get-url " + videoURL, function (err, stdout, stderr) {
            console.log(stderr.toString());
            //Converting the buffer to a string is a little costly so let's do it upfront
            youtubeDlUrl = stdout.toString();
            youtubeDlUrl = youtubeDlUrl.substring(0, youtubeDlUrl.length - 1);
            res.contentType("audio/mpeg3");
            var ffmpegChild = child_process_1.spawn("ffmpeg", ["-i", "pipe:0", "-acodec", "libmp3lame", "-f", "mp3", "-"]);
            ffmpegChild.stdout.pipe(res);
            try {
                var webhook = "http://www.youtube.com/";
                console.log(webhook);
                request({ url: youtubeDlUrl, uri: webhook, headers: { "Youtubedl-no-compression": "True" } }).pipe(ffmpegChild.stdin);
            }
            catch (error) {
                console.log(error);
            }
        });
        /* youtubeDlUrlChild.stdout.on("data", (data: Buffer) => {
            youtubeDlUrl += decoder.write(data);
        }); */
        /* youtubeDlUrlChild.stdout.on("end", () => {
            //Converting the buffer to a string is a little costly so let's do it upfront
            youtubeDlUrl = youtubeDlUrl.substring(0, youtubeDlUrl.length - 1);
            console.log(`SIE URL IZ: ${youtubeDlUrl}`);
            // # Before we write the output, ensure that we're sending it back with the proper content type
            res.setHeader("Content-Type", "audio/mpeg3");
            // # Create an ffmpeg process to feed the video to.
            let ffmpegChild = spawn ("ffmpeg", ["-i", "pipe:0", "-acodec", "libmp3lame", "-f", "mp3", "-"]);
            // # Setting up the output pipe before we set up the input pipe ensures wedon't loose any data.
            ffmpegChild.stdout.pipe(res);
            // # GET the FLV, pipe the response's body to our ffmpeg process.
            request({
                uri: youtubeDlUrl,
                headers: {
                    "Youtubedl-no-compression": "True"
                },
                method: "GET"
            }).pipe(ffmpegChild.stdin);
            next();
        }); */
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxrQ0FBa0U7QUFDbEUsaURBQStDO0FBQy9DLGlDQUFtQztBQUNuQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkI7OztHQUdHO0FBQ0g7SUFBdUMscUNBQVM7SUFrQjVDOzs7OztPQUtHO0lBQ0g7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUF4QkQ7Ozs7Ozs7T0FPRztJQUNXLHdCQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQ3JGLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZRDs7Ozs7Ozs7T0FRRztJQUNJLG9DQUFRLEdBQWYsVUFBZ0IsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUMzRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLHVDQUFXLEdBQWxCLFVBQW1CLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDOUQsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0I7UUFDbEQsSUFBSSxRQUFRLEdBQUcsaUNBQWlDLEdBQUcsT0FBTyxDQUFDO1FBQzNELElBQUks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LENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxJQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUNuQixFQUFFLENBQUMsUUFBUSxDQUFDLE9BQUssUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxTQUFNLEVBQUUsVUFBQyxHQUFVLEVBQUUsSUFBUztnQkFDeEUsNkVBQTZFO2dCQUM3RSxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLElBQUk7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBa0MsSUFBTSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQXZJQSxBQXVJQyxDQXZJc0MscUJBQVMsR0F1SS9DO0FBdklZLDhDQUFpQiIsImZpbGUiOiJyb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UsIFJvdXRlcn0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtCYXNlUm91dGV9IGZyb20gXCIuL0Jhc2VSb3V0ZVwiO1xyXG5pbXBvcnQgeyBzcGF3biwgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbmltcG9ydCB7IGZyb21EaXIsIGdldFN1YlN0cmluZ0JldHdlZW5Ud29TdHJpbmdzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IFN0cmluZ0RlY29kZXIgfSBmcm9tIFwic3RyaW5nX2RlY29kZXJcIjtcclxuaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tIFwicmVxdWVzdFwiO1xyXG52YXIgZnMgPSByZXF1aXJlKFwiZnNcIik7XHJcblxyXG4vKipcclxuICogXCIveW91dHViZS1kb3dubG9hZFwiIHJvdXRlXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRG93bmxvYWRUdWJlUm91dGUgZXh0ZW5kcyBCYXNlUm91dGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHJvdXRlXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIERvd25sb2FkVHViZVJvdXRlXHJcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxyXG4gICAgICogQHBhcmFtIHJvdXRlciB7Um91dGVyfSBUaGUgRXhwcmVzcyBSb3V0ZXIuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbRG93bmxvYWRUdWJlUm91dGU6OmNyZWF0ZV0gQ3JlYXRpbmcgeW91dHViZSBkb3dubG9hZCByb3V0ZS5cIik7XHJcblxyXG4gICAgICAgIHJvdXRlci5nZXQoXCIveW91dHViZS1kb3dubG9hZC86dmlkZW9JRFwiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgbmV3IERvd25sb2FkVHViZVJvdXRlKCkuZG93bmxvYWQocmVxLCByZXMsIG5leHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHR1YmUgZG93bmxvYWQgcGFnZSByb3V0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBtZXRob2QgZG93bmxvYWRcclxuICAgICAqIEBwYXJhbSByZXEge1JlcXVlc3R9IFRoZSBFeHByZXNzIFJlcXVlc3Qgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSBFeHByZXNzIFJlc3BvbnNlIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSBuZXh0IHtOZXh0RnVuY3Rpb259IEV4ZWN1dGUgdGhlIG5leHQgbWV0aG9kLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG93bmxvYWQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICAvLyB0aGlzLmRvd25sb2FkQXVkaW9Ub1Jvb3QocmVxLCByZXMpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBcIk11c2lRIERvd25sb2FkIFR1YmVcIjtcclxuICAgICAgICB0aGlzLnN0cmVhbUF1ZGlvKHJlcSwgcmVzLCBuZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RyZWFtQXVkaW8ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgdmlkZW9JRCA9IHJlcS5wYXJhbXMudmlkZW9JRDsgLy9cIlpUWTh2bEtPOWhnXCI7XHJcbiAgICAgICAgbGV0IHZpZGVvVVJMID0gXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9XCIgKyB2aWRlb0lEO1xyXG4gICAgICAgIGxldCB5b3V0dWJlRGxVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihcInV0ZjhcIik7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7IGVuY29kaW5nOiBcInV0ZjhcIn07XHJcblxyXG4gICAgICAgIC8vICMgU3Bhd24gYSBjaGlsZCBwcm9jZXNzIHRvIG9idGFpbiB0aGUgVVJMIHRvIHRoZSBGTFYodG8gdGhlIHlvdXR1YmUgdmlkKVxyXG4gICAgICAgIGxldCB5b3V0dWJlRGxVcmxDaGlsZCA9IGV4ZWMoXCJcXC5cXFxcZGlzdFxcXFx5b3V0dWJlX2RsXFxcXHlvdXR1YmUtZGwgLS1zaW11bGF0ZSAtLWdldC11cmwgXCIgKyB2aWRlb1VSTCwgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RkZXJyLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAvL0NvbnZlcnRpbmcgdGhlIGJ1ZmZlciB0byBhIHN0cmluZyBpcyBhIGxpdHRsZSBjb3N0bHkgc28gbGV0J3MgZG8gaXQgdXBmcm9udFxyXG4gICAgICAgICAgICB5b3V0dWJlRGxVcmwgPSBzdGRvdXQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgeW91dHViZURsVXJsID0geW91dHViZURsVXJsLnN1YnN0cmluZygwLCB5b3V0dWJlRGxVcmwubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIHJlcy5jb250ZW50VHlwZShcImF1ZGlvL21wZWczXCIpO1xyXG4gICAgICAgICAgICBsZXQgZmZtcGVnQ2hpbGQgPSBzcGF3bihcImZmbXBlZ1wiLCBbXCItaVwiLCBcInBpcGU6MFwiLCBcIi1hY29kZWNcIiwgXCJsaWJtcDNsYW1lXCIsIFwiLWZcIiwgXCJtcDNcIiwgXCItXCJdKTtcclxuICAgICAgICAgICAgZmZtcGVnQ2hpbGQuc3Rkb3V0LnBpcGUocmVzKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciB3ZWJob29rID0gXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL1wiO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cod2ViaG9vayk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0KHsgdXJsOiB5b3V0dWJlRGxVcmwsIHVyaTogd2ViaG9vaywgaGVhZGVyczogeyBcIllvdXR1YmVkbC1uby1jb21wcmVzc2lvblwiOiBcIlRydWVcIiB9IH0pLnBpcGUoZmZtcGVnQ2hpbGQuc3RkaW4pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyogeW91dHViZURsVXJsQ2hpbGQuc3Rkb3V0Lm9uKFwiZGF0YVwiLCAoZGF0YTogQnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHlvdXR1YmVEbFVybCArPSBkZWNvZGVyLndyaXRlKGRhdGEpO1xyXG4gICAgICAgIH0pOyAqL1xyXG5cclxuICAgICAgICAvKiB5b3V0dWJlRGxVcmxDaGlsZC5zdGRvdXQub24oXCJlbmRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL0NvbnZlcnRpbmcgdGhlIGJ1ZmZlciB0byBhIHN0cmluZyBpcyBhIGxpdHRsZSBjb3N0bHkgc28gbGV0J3MgZG8gaXQgdXBmcm9udFxyXG4gICAgICAgICAgICB5b3V0dWJlRGxVcmwgPSB5b3V0dWJlRGxVcmwuc3Vic3RyaW5nKDAsIHlvdXR1YmVEbFVybC5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFNJRSBVUkwgSVo6ICR7eW91dHViZURsVXJsfWApO1xyXG4gICAgICAgICAgICAvLyAjIEJlZm9yZSB3ZSB3cml0ZSB0aGUgb3V0cHV0LCBlbnN1cmUgdGhhdCB3ZSdyZSBzZW5kaW5nIGl0IGJhY2sgd2l0aCB0aGUgcHJvcGVyIGNvbnRlbnQgdHlwZVxyXG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXVkaW8vbXBlZzNcIik7XHJcbiAgICAgICAgICAgIC8vICMgQ3JlYXRlIGFuIGZmbXBlZyBwcm9jZXNzIHRvIGZlZWQgdGhlIHZpZGVvIHRvLlxyXG4gICAgICAgICAgICBsZXQgZmZtcGVnQ2hpbGQgPSBzcGF3biAoXCJmZm1wZWdcIiwgW1wiLWlcIiwgXCJwaXBlOjBcIiwgXCItYWNvZGVjXCIsIFwibGlibXAzbGFtZVwiLCBcIi1mXCIsIFwibXAzXCIsIFwiLVwiXSk7XHJcbiAgICAgICAgICAgIC8vICMgU2V0dGluZyB1cCB0aGUgb3V0cHV0IHBpcGUgYmVmb3JlIHdlIHNldCB1cCB0aGUgaW5wdXQgcGlwZSBlbnN1cmVzIHdlZG9uJ3QgbG9vc2UgYW55IGRhdGEuXHJcbiAgICAgICAgICAgIGZmbXBlZ0NoaWxkLnN0ZG91dC5waXBlKHJlcyk7XHJcbiAgICAgICAgICAgIC8vICMgR0VUIHRoZSBGTFYsIHBpcGUgdGhlIHJlc3BvbnNlJ3MgYm9keSB0byBvdXIgZmZtcGVnIHByb2Nlc3MuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJpOiB5b3V0dWJlRGxVcmwsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJZb3V0dWJlZGwtbm8tY29tcHJlc3Npb25cIjogXCJUcnVlXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCJcclxuICAgICAgICAgICAgfSkucGlwZShmZm1wZWdDaGlsZC5zdGRpbik7XHJcbiAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICB9KTsgKi9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG93bmxvYWRBdWRpb1RvUm9vdChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBsZXQgdmlkZW9VUkwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0keyByZXEucGFyYW1zLnZpZGVvSUR9YDtcclxuXHJcbiAgICAgICAgbGV0IHR1YmVEbCA9IHNwYXduKFwiLi9kaXN0L3lvdXR1YmVfZGwveW91dHViZS1kbFwiLCBbXCItLWV4dHJhY3QtYXVkaW9cIiwgXCItLWF1ZGlvLWZvcm1hdFwiLCBcIm1wM1wiLCBcIi0tYXVkaW8tcXVhbGl0eVwiLCBcIjlcIiwgdmlkZW9VUkxdKTtcclxuXHJcbiAgICAgICAgbGV0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihcInV0ZjhcIik7XHJcbiAgICAgICAgbGV0IGRhdGFTdHI6IHN0cmluZztcclxuICAgICAgICBsZXQgZmlsZU5hbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgdHViZURsLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGE6IEJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICBkYXRhU3RyID0gZGVjb2Rlci53cml0ZShkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGFTdHIuaW5kZXhPZihcIm1wM1wiKSAhPT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IGdldFN1YlN0cmluZ0JldHdlZW5Ud29TdHJpbmdzKGRhdGFTdHIsIFwiRGVzdGluYXRpb246IFwiLCBgLSR7cmVxLnBhcmFtcy52aWRlb0lEfS5tcDNgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGSUxFIE5BTUUgSVo6ICR7ZmlsZU5hbWV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZURsLnN0ZG91dC5vbihcImVuZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFTdHIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlRGwuc3RkZXJyLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc3RkZXJyOiAke2RhdGF9YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVEbC5vbihcImV4aXRcIiwgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgZnMucmVhZEZpbGUoYC4vJHtmaWxlTmFtZX0ke3JlcS5wYXJhbXMudmlkZW9JRH0ubXAzYCwgKGVycjogRXJyb3IsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gV2Ugc2V0IG91ciBjb250ZW50IHR5cGUgc28gY29uc3VtZXJzIG9mIG91ciBBUEkga25vdyB3aGF0IHRoZXkgYXJlIGdldHRpbmdcclxuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhdWRpby9tcGVnM1wiKTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZURsLm9uKFwiY2xvc2VcIiwgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGNoaWxkIHByb2Nlc3MgZXhpdGVkIHdpdGggY29kZSAke2NvZGV9YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFxzcmMifQ==
