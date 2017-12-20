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
        this.streamAudio(req, res, next);
    };
    DownloadTubeRoute.prototype.streamAudio = function (req, res, next) {
        var videoID = 'ZTY8vlKO9hg'; // req.params.videoID
        var video_URL = "http://www.youtube.com/watch?v=" + videoID;
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
            res.setHeader('Content-Type', 'audio/mpeg3');
            // # Create an ffmpeg process to feed the video to.
            var ffmpeg_child = child_process_1.spawn("ffmpeg", ['-i', 'pipe:0', '-acodec', 'libmp3lame', '-f', 'mp3', '-']);
            // # Setting up the output pipe before we set up the input pipe ensures wedon't loose any data.
            ffmpeg_child.stdout.pipe(res);
            // # GET the FLV, pipe the response's body to our ffmpeg process.
            request({
                uri: youtubeDlUrl,
                headers: {
                    'Youtubedl-no-compression': 'True'
                },
                method: 'GET'
            }).pipe(ffmpeg_child.stdin);
            next();
        });
    };
    DownloadTubeRoute.prototype.downloadAudioToRoot = function (req, res, next) {
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
                next();
            });
        });
        tube_dl.on('close', function (code) {
            console.log("child process exited with code " + code);
        });
    };
    return DownloadTubeRoute;
}(BaseRoute_1.BaseRoute));
exports.DownloadTubeRoute = DownloadTubeRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxrQ0FBa0U7QUFDbEUsaURBQStDO0FBQy9DLGlDQUFtQztBQUNuQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkI7OztHQUdHO0FBQ0g7SUFBdUMscUNBQVM7SUFrQjVDOzs7OztPQUtHO0lBQ0g7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUF4QkQ7Ozs7Ozs7T0FPRztJQUNXLHdCQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQ3JGLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZRDs7Ozs7Ozs7T0FRRztJQUNJLG9DQUFRLEdBQWYsVUFBZ0IsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUMzRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLHVDQUFXLEdBQWxCLFVBQW1CLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDOUQsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDLENBQUMscUJBQXFCO1FBQ2xELElBQUksU0FBUyxHQUFHLG9DQUFrQyxPQUFTLENBQUM7UUFDNUQsSUFBSSxZQUFZLEdBQVUsRUFBRSxDQUFDO1FBQzdC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QUFDO1FBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQVcsSUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQUk7WUFDcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFLLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sU0FBTSxFQUFFLFVBQUMsR0FBVSxFQUFFLElBQVM7Z0JBQ3hFLDZFQUE2RTtnQkFDN0UsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxJQUFJO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQWtDLElBQU0sQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVMLHdCQUFDO0FBQUQsQ0F4SEEsQUF3SEMsQ0F4SHNDLHFCQUFTLEdBd0gvQztBQXhIWSw4Q0FBaUIiLCJmaWxlIjoicm91dGVzL0Rvd25sb2FkVHViZVJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlLCBSb3V0ZXJ9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7QmFzZVJvdXRlfSBmcm9tIFwiLi9CYXNlUm91dGVcIjtcclxuaW1wb3J0IHsgc3Bhd24sIGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5pbXBvcnQgeyBmcm9tRGlyLCBnZXRTdWJTdHJpbmdCZXR3ZWVuVHdvU3RyaW5ncyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xyXG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xyXG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5cclxuLyoqXHJcbiAqIFwiL3lvdXR1YmUtZG93bmxvYWRcIiByb3V0ZVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERvd25sb2FkVHViZVJvdXRlIGV4dGVuZHMgQmFzZVJvdXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSByb3V0ZVxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSByb3V0ZXIge1JvdXRlcn0gVGhlIEV4cHJlc3MgUm91dGVyLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShyb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0Rvd25sb2FkVHViZVJvdXRlOjpjcmVhdGVdIENyZWF0aW5nIHlvdXR1YmUgZG93bmxvYWQgcm91dGUuXCIpO1xyXG5cclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3lvdXR1YmUtZG93bmxvYWQvOnZpZGVvSURcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBEb3dubG9hZFR1YmVSb3V0ZSgpLmRvd25sb2FkKHJlcSwgcmVzLCBuZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIERvd25sb2FkVHViZVJvdXRlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0dWJlIGRvd25sb2FkIHBhZ2Ugcm91dGUuXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIERvd25sb2FkVHViZVJvdXRlXHJcbiAgICAgKiBAbWV0aG9kIGRvd25sb2FkXHJcbiAgICAgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgRXhwcmVzcyBSZXF1ZXN0IG9iamVjdC5cclxuICAgICAqIEBwYXJhbSByZXMge1Jlc3BvbnNlfSBUaGUgRXhwcmVzcyBSZXNwb25zZSBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gbmV4dCB7TmV4dEZ1bmN0aW9ufSBFeGVjdXRlIHRoZSBuZXh0IG1ldGhvZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvd25sb2FkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLy8gdGhpcy5kb3dubG9hZEF1ZGlvVG9Sb290KHJlcSwgcmVzKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJNdXNpUSBEb3dubG9hZCBUdWJlXCI7XHJcbiAgICAgICAgdGhpcy5zdHJlYW1BdWRpbyhyZXEsIHJlcywgbmV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0cmVhbUF1ZGlvKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHZpZGVvSUQgPSAnWlRZOHZsS085aGcnOyAvLyByZXEucGFyYW1zLnZpZGVvSURcclxuICAgICAgICBsZXQgdmlkZW9fVVJMID0gYGh0dHA6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0ke3ZpZGVvSUR9YDtcclxuICAgICAgICBsZXQgeW91dHViZURsVXJsOnN0cmluZyA9ICcnO1xyXG4gICAgICAgIGxldCBkZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHsgZW5jb2Rpbmc6ICd1dGY4J307XHJcblxyXG4gICAgICAgIC8vICMgU3Bhd24gYSBjaGlsZCBwcm9jZXNzIHRvIG9idGFpbiB0aGUgVVJMIHRvIHRoZSBGTFYodG8gdGhlIHlvdXR1YmUgdmlkKVxyXG4gICAgICAgIGxldCB5b3V0dWJlRGxVcmxDaGlsZCA9IHNwYXduKCcuL2Rpc3QveW91dHViZV9kbC95b3V0dWJlLWRsJywgWyctLXNpbXVsYXRlJywgJy0tZ2V0LXVybCcsIHZpZGVvX1VSTF0pO1xyXG4gICAgICAgIHlvdXR1YmVEbFVybENoaWxkLnN0ZG91dC5vbignZGF0YScsIChkYXRhOkJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICB5b3V0dWJlRGxVcmwgKz0gZGVjb2Rlci53cml0ZShkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgeW91dHViZURsVXJsQ2hpbGQuc3Rkb3V0Lm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vQ29udmVydGluZyB0aGUgYnVmZmVyIHRvIGEgc3RyaW5nIGlzIGEgbGl0dGxlIGNvc3RseSBzbyBsZXQncyBkbyBpdCB1cGZyb250XHJcbiAgICAgICAgICAgIHlvdXR1YmVEbFVybCA9IHlvdXR1YmVEbFVybC5zdWJzdHJpbmcoMCwgeW91dHViZURsVXJsLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU0lFIFVSTCBJWjogJHt5b3V0dWJlRGxVcmx9YCk7XHJcbiAgICAgICAgICAgIC8vICMgQmVmb3JlIHdlIHdyaXRlIHRoZSBvdXRwdXQsIGVuc3VyZSB0aGF0IHdlJ3JlIHNlbmRpbmcgaXQgYmFjayB3aXRoIHRoZSBwcm9wZXIgY29udGVudCB0eXBlXHJcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhdWRpby9tcGVnMycpO1xyXG4gICAgICAgICAgICAvLyAjIENyZWF0ZSBhbiBmZm1wZWcgcHJvY2VzcyB0byBmZWVkIHRoZSB2aWRlbyB0by5cclxuICAgICAgICAgICAgbGV0IGZmbXBlZ19jaGlsZCA9IHNwYXduIChcImZmbXBlZ1wiLCBbJy1pJywgJ3BpcGU6MCcsICctYWNvZGVjJywgJ2xpYm1wM2xhbWUnLCAnLWYnLCAnbXAzJywgJy0nXSk7XHJcbiAgICAgICAgICAgIC8vICMgU2V0dGluZyB1cCB0aGUgb3V0cHV0IHBpcGUgYmVmb3JlIHdlIHNldCB1cCB0aGUgaW5wdXQgcGlwZSBlbnN1cmVzIHdlZG9uJ3QgbG9vc2UgYW55IGRhdGEuXHJcbiAgICAgICAgICAgIGZmbXBlZ19jaGlsZC5zdGRvdXQucGlwZShyZXMpO1xyXG4gICAgICAgICAgICAvLyAjIEdFVCB0aGUgRkxWLCBwaXBlIHRoZSByZXNwb25zZSdzIGJvZHkgdG8gb3VyIGZmbXBlZyBwcm9jZXNzLlxyXG4gICAgICAgICAgICByZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVyaTogeW91dHViZURsVXJsLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdZb3V0dWJlZGwtbm8tY29tcHJlc3Npb24nOiAnVHJ1ZSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgICAgIH0pLnBpcGUoZmZtcGVnX2NoaWxkLnN0ZGluKTtcclxuICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvd25sb2FkQXVkaW9Ub1Jvb3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuXHJcbiAgICAgICAgbGV0IHZpZGVvX1VSTCA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSR7IHJlcS5wYXJhbXMudmlkZW9JRH1gO1xyXG5cclxuICAgICAgICBsZXQgdHViZV9kbCA9IHNwYXduKCcuL2Rpc3QveW91dHViZV9kbC95b3V0dWJlLWRsJywgWyctLWV4dHJhY3QtYXVkaW8nLCAnLS1hdWRpby1mb3JtYXQnLCAnbXAzJywgJy0tYXVkaW8tcXVhbGl0eScsICc5JywgdmlkZW9fVVJMXSk7XHJcblxyXG4gICAgICAgIGxldCBkZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKTtcclxuICAgICAgICBsZXQgZGF0YVN0cjpzdHJpbmc7XHJcbiAgICAgICAgbGV0IGZpbGVOYW1lOnN0cmluZztcclxuXHJcbiAgICAgICAgdHViZV9kbC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YTogQnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFTdHIgPSBkZWNvZGVyLndyaXRlKGRhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhU3RyLmluZGV4T2YoJ21wMycpICE9PSAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gZ2V0U3ViU3RyaW5nQmV0d2VlblR3b1N0cmluZ3MoZGF0YVN0ciwgJ0Rlc3RpbmF0aW9uOiAnLCBgLSR7cmVxLnBhcmFtcy52aWRlb0lEfS5tcDNgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGSUxFIE5BTUUgSVo6ICR7ZmlsZU5hbWV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5zdGRvdXQub24oJ2VuZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVN0cik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVfZGwuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHN0ZGVycjogJHtkYXRhfWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlX2RsLm9uKCdleGl0JywgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgZnMucmVhZEZpbGUoYC4vJHtmaWxlTmFtZX0ke3JlcS5wYXJhbXMudmlkZW9JRH0ubXAzYCwgKGVycjogRXJyb3IsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gV2Ugc2V0IG91ciBjb250ZW50IHR5cGUgc28gY29uc3VtZXJzIG9mIG91ciBBUEkga25vdyB3aGF0IHRoZXkgYXJlIGdldHRpbmdcclxuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhdWRpby9tcGVnMycpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlX2RsLm9uKCdjbG9zZScsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjaGlsZCBwcm9jZXNzIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcc3JjIn0=
