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
var fs = require('fs');
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
        this.streamAudio(req, res);
        next();
    };
    DownloadTubeRoute.prototype.streamAudio = function (req, res) {
        var video_URL = "http://www.youtube.com/watch?v=" + req.params.videoID;
        var youtubeDlUrl = '';
        var decoder = new string_decoder_1.StringDecoder('utf8');
        var options = { encoding: 'utf8' };
        // # Spawn a child process to obtain the URL to the FLV(to the youtube vid)
        var youtubeDlUrlChild = child_process_1.spawn('./dist/youtube_dl/youtube-dl', ['--simulate', '--get-url', video_URL]);
        youtubeDlUrlChild.stdout.on('data', function (data) {
            youtubeDlUrl += decoder.write(data);
        });
        youtubeDlUrlChild.stdout.on('end', function () {
            //Converting the buffer to a string is a little costly so let's do it upfront
            youtubeDlUrl = youtubeDlUrl.substring(0, youtubeDlUrl.length - 1);
            console.log("SIE URL IZ: " + youtubeDlUrl);
            // # Before we write the output, ensure that we're sending it back with the proper content type
            // # Create an ffmpeg process to feed the video to.
            var ffmpeg_child = child_process_1.spawn("ffmpeg", ['-i', 'pipe:0', '-acodec', /*'libmp3lame',*/ '-f', 'mp3', '-']);
            // # Setting up the output pipe before we set up the input pipe ensures wedon't loose any data.
            // res.setHeader();
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
        });
    };
    DownloadTubeRoute.prototype.downloadAudioToRoot = function (req, res) {
        var video_URL = "https://www.youtube.com/watch?v=" + req.params.videoID;
        var tube_dl = child_process_1.spawn('./dist/youtube_dl/youtube-dl', ['--extract-audio', '--audio-format', 'mp3', '--audio-quality', '9', video_URL]);
        var decoder = new string_decoder_1.StringDecoder('utf8');
        var dataStr;
        var fileName;
        tube_dl.stdout.on('data', function (data) {
            dataStr = decoder.write(data);
            if (dataStr.indexOf('mp3') !== -1) {
                fileName = utils_1.getSubStringBetweenTwoStrings(dataStr, 'Destination: ', "-" + req.params.videoID + ".mp3");
                console.log("FILE NAME IZ: " + fileName);
            }
        });
        tube_dl.stdout.on('end', function () {
            console.log(dataStr);
        });
        tube_dl.stderr.on('data', function (data) {
            console.log("stderr: " + data);
        });
        tube_dl.on('exit', function (code) {
            fs.readFile("./" + fileName + req.params.videoID + ".mp3", function (err, data) {
                // We set our content type so consumers of our API know what they are getting
                res.setHeader('Content-Type', 'audio/mpeg3');
                res.send(data);
            });
        });
        tube_dl.on('close', function (code) {
            console.log("child process exited with code " + code);
        });
    };
    return DownloadTubeRoute;
}(BaseRoute_1.BaseRoute));
exports.DownloadTubeRoute = DownloadTubeRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxrQ0FBa0U7QUFDbEUsaURBQStDO0FBQy9DLGlDQUFtQztBQUNuQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkI7OztHQUdHO0FBQ0g7SUFBdUMscUNBQVM7SUFrQjVDOzs7OztPQUtHO0lBQ0g7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUF4QkQ7Ozs7Ozs7T0FPRztJQUNXLHdCQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQ3JGLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZRDs7Ozs7Ozs7T0FRRztJQUNJLG9DQUFRLEdBQWYsVUFBZ0IsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUMzRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFTSx1Q0FBVyxHQUFsQixVQUFtQixHQUFZLEVBQUUsR0FBYTtRQUMxQyxJQUFJLFNBQVMsR0FBRyxvQ0FBa0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFTLENBQUM7UUFDdkUsSUFBSSxZQUFZLEdBQVUsRUFBRSxDQUFDO1FBQzdCLElBQUksT0FBTyxHQUFHLElBQUksOEJBQWEs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QUMsR0FBRyxDQUFDLGFBQVcsSUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQUk7WUFDcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFLLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sU0FBTSxFQUFFLFVBQUMsR0FBVSxFQUFFLElBQVM7Z0JBQ3hFLDZFQUE2RTtnQkFDN0UsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsSUFBSTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFrQyxJQUFNLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCx3QkFBQztBQUFELENBdkhBLEFBdUhDLENBdkhzQyxxQkFBUyxHQXVIL0M7QUF2SFksOENBQWlCIiwiZmlsZSI6InJvdXRlcy9Eb3dubG9hZFR1YmVSb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQge0Jhc2VSb3V0ZX0gZnJvbSBcIi4vQmFzZVJvdXRlXCI7XHJcbmltcG9ydCB7IHNwYXduLCBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuaW1wb3J0IHsgZnJvbURpciwgZ2V0U3ViU3RyaW5nQmV0d2VlblR3b1N0cmluZ3MgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgU3RyaW5nRGVjb2RlciB9IGZyb20gJ3N0cmluZ19kZWNvZGVyJztcclxuaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcclxudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbi8qKlxyXG4gKiBcIi95b3V0dWJlLWRvd25sb2FkXCIgcm91dGVcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZSBleHRlbmRzIEJhc2VSb3V0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgcm91dGVcclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBtZXRob2QgY3JlYXRlXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyIHtSb3V0ZXJ9IFRoZSBFeHByZXNzIFJvdXRlci5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltEb3dubG9hZFR1YmVSb3V0ZTo6Y3JlYXRlXSBDcmVhdGluZyB5b3V0dWJlIGRvd25sb2FkIHJvdXRlLlwiKTtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi95b3V0dWJlLWRvd25sb2FkLzp2aWRlb0lEXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBuZXcgRG93bmxvYWRUdWJlUm91dGUoKS5kb3dubG9hZChyZXEsIHJlcywgbmV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHViZSBkb3dubG9hZCBwYWdlIHJvdXRlLlxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBkb3dubG9hZFxyXG4gICAgICogQHBhcmFtIHJlcSB7UmVxdWVzdH0gVGhlIEV4cHJlc3MgUmVxdWVzdCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gcmVzIHtSZXNwb25zZX0gVGhlIEV4cHJlc3MgUmVzcG9uc2Ugb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gRXhlY3V0ZSB0aGUgbmV4dCBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIC8vIHRoaXMuZG93bmxvYWRBdWRpb1RvUm9vdChyZXEsIHJlcyk7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiTXVzaVEgRG93bmxvYWQgVHViZVwiO1xyXG4gICAgICAgIHRoaXMuc3RyZWFtQXVkaW8ocmVxLCByZXMpO1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RyZWFtQXVkaW8ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgbGV0IHZpZGVvX1VSTCA9IGBodHRwOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9JHtyZXEucGFyYW1zLnZpZGVvSUR9YDtcclxuICAgICAgICBsZXQgeW91dHViZURsVXJsOnN0cmluZyA9ICcnO1xyXG4gICAgICAgIGxldCBkZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHsgZW5jb2Rpbmc6ICd1dGY4J307XHJcblxyXG4gICAgICAgIC8vICMgU3Bhd24gYSBjaGlsZCBwcm9jZXNzIHRvIG9idGFpbiB0aGUgVVJMIHRvIHRoZSBGTFYodG8gdGhlIHlvdXR1YmUgdmlkKVxyXG4gICAgICAgIGxldCB5b3V0dWJlRGxVcmxDaGlsZCA9IHNwYXduKCcuL2Rpc3QveW91dHViZV9kbC95b3V0dWJlLWRsJywgWyctLXNpbXVsYXRlJywgJy0tZ2V0LXVybCcsIHZpZGVvX1VSTF0pO1xyXG4gICAgICAgIHlvdXR1YmVEbFVybENoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhOkJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICB5b3V0dWJlRGxVcmwgKz0gZGVjb2Rlci53cml0ZShkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgeW91dHViZURsVXJsQ2hpbGQuc3Rkb3V0Lm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vQ29udmVydGluZyB0aGUgYnVmZmVyIHRvIGEgc3RyaW5nIGlzIGEgbGl0dGxlIGNvc3RseSBzbyBsZXQncyBkbyBpdCB1cGZyb250XHJcbiAgICAgICAgICAgIHlvdXR1YmVEbFVybCA9IHlvdXR1YmVEbFVybC5zdWJzdHJpbmcoMCwgeW91dHViZURsVXJsLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU0lFIFVSTCBJWjogJHt5b3V0dWJlRGxVcmx9YCk7XHJcbiAgICAgICAgICAgIC8vICMgQmVmb3JlIHdlIHdyaXRlIHRoZSBvdXRwdXQsIGVuc3VyZSB0aGF0IHdlJ3JlIHNlbmRpbmcgaXQgYmFjayB3aXRoIHRoZSBwcm9wZXIgY29udGVudCB0eXBlXHJcbiAgICAgICAgICAgIC8vICMgQ3JlYXRlIGFuIGZmbXBlZyBwcm9jZXNzIHRvIGZlZWQgdGhlIHZpZGVvIHRvLlxyXG4gICAgICAgICAgICBsZXQgZmZtcGVnX2NoaWxkID0gc3Bhd24gKFwiZmZtcGVnXCIsIFsnLWknLCAncGlwZTowJywgJy1hY29kZWMnLCAvKidsaWJtcDNsYW1lJywqLyAnLWYnLCAnbXAzJywgJy0nXSk7XHJcbiAgICAgICAgICAgIC8vICMgU2V0dGluZyB1cCB0aGUgb3V0cHV0IHBpcGUgYmVmb3JlIHdlIHNldCB1cCB0aGUgaW5wdXQgcGlwZSBlbnN1cmVzIHdlZG9uJ3QgbG9vc2UgYW55IGRhdGEuXHJcbiAgICAgICAgICAgIC8vIHJlcy5zZXRIZWFkZXIoKTtcclxuICAgICAgICAgICAgZmZtcGVnX2NoaWxkLnN0ZG91dC5waXBlKHJlcyk7XHJcbiAgICAgICAgICAgIC8vICMgR0VUIHRoZSBGTFYsIHBpcGUgdGhlIHJlc3BvbnNlJ3MgYm9keSB0byBvdXIgZmZtcGVnIHByb2Nlc3MuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJpOiB5b3V0dWJlRGxVcmwsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ1lvdXR1YmVkbC1uby1jb21wcmVzc2lvbic6ICdUcnVlJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2F1ZGlvL21wZWczJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICAgICAgfSkucGlwZShmZm1wZWdfY2hpbGQuc3RkaW4pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvd25sb2FkQXVkaW9Ub1Jvb3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgIGxldCB2aWRlb19VUkwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0keyByZXEucGFyYW1zLnZpZGVvSUR9YDtcclxuXHJcbiAgICAgICAgbGV0IHR1YmVfZGwgPSBzcGF3bignLi9kaXN0L3lvdXR1YmVfZGwveW91dHViZS1kbCcsIFsnLS1leHRyYWN0LWF1ZGlvJywgJy0tYXVkaW8tZm9ybWF0JywgJ21wMycsICctLWF1ZGlvLXF1YWxpdHknLCAnOScsIHZpZGVvX1VSTF0pO1xyXG5cclxuICAgICAgICBsZXQgZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKCd1dGY4Jyk7XHJcbiAgICAgICAgbGV0IGRhdGFTdHI6c3RyaW5nO1xyXG4gICAgICAgIGxldCBmaWxlTmFtZTpzdHJpbmc7XHJcblxyXG4gICAgICAgIHR1YmVfZGwuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGE6IEJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICBkYXRhU3RyID0gZGVjb2Rlci53cml0ZShkYXRhKTtcclxuICAgICAgICAgICAgaWYoZGF0YVN0ci5pbmRleE9mKCdtcDMnKSAhPT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IGdldFN1YlN0cmluZ0JldHdlZW5Ud29TdHJpbmdzKGRhdGFTdHIsICdEZXN0aW5hdGlvbjogJywgYC0ke3JlcS5wYXJhbXMudmlkZW9JRH0ubXAzYCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRklMRSBOQU1FIElaOiAke2ZpbGVOYW1lfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVfZGwuc3Rkb3V0Lm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFTdHIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlX2RsLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7ZGF0YX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5vbignZXhpdCcsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLnJlYWRGaWxlKGAuLyR7ZmlsZU5hbWV9JHtyZXEucGFyYW1zLnZpZGVvSUR9Lm1wM2AsIChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIHNldCBvdXIgY29udGVudCB0eXBlIHNvIGNvbnN1bWVycyBvZiBvdXIgQVBJIGtub3cgd2hhdCB0aGV5IGFyZSBnZXR0aW5nXHJcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXVkaW8vbXBlZzMnKTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5vbignY2xvc2UnLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY2hpbGQgcHJvY2VzcyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIuLiJ9
