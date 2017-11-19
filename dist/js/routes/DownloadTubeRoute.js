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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxrQ0FBa0U7QUFDbEUsaURBQStDO0FBQy9DLGlDQUFtQztBQUNuQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkI7OztHQUdHO0FBQ0g7SUFBdUMscUNBQVM7SUFrQjVDOzs7OztPQUtHO0lBQ0g7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUF4QkQ7Ozs7Ozs7T0FPRztJQUNXLHdCQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQ3JGLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZRDs7Ozs7Ozs7T0FRRztJQUNJLG9DQUFRLEdBQWYsVUFBZ0IsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUMzRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFTSx1Q0FBVyxHQUFsQixVQUFtQixHQUFZLEVBQUUsR0FBYTtRQUMxQyxJQUFJLFNBQVMsR0FBRyxvQ0FBa0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFTLENBQUM7UUFDdkUsSUFBSSxZQUFZLEdBQVUsRUFBRSxDQUFDO1FBQzdCLElBQUksT0FBTyxHQUFHLElBQUksOEJBQWEs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YUFBVyxJQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUNwQixFQUFFLENBQUMsUUFBUSxDQUFDLE9BQUssUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxTQUFNLEVBQUUsVUFBQyxHQUFVLEVBQUUsSUFBUztnQkFDeEUsNkVBQTZFO2dCQUM3RSxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxJQUFJO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQWtDLElBQU0sQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVMLHdCQUFDO0FBQUQsQ0F0SEEsQUFzSEMsQ0F0SHNDLHFCQUFTLEdBc0gvQztBQXRIWSw4Q0FBaUIiLCJmaWxlIjoicm91dGVzL0Rvd25sb2FkVHViZVJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlLCBSb3V0ZXJ9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7QmFzZVJvdXRlfSBmcm9tIFwiLi9CYXNlUm91dGVcIjtcclxuaW1wb3J0IHsgc3Bhd24sIGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5pbXBvcnQgeyBmcm9tRGlyLCBnZXRTdWJTdHJpbmdCZXR3ZWVuVHdvU3RyaW5ncyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSAnc3RyaW5nX2RlY29kZXInO1xyXG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xyXG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5cclxuLyoqXHJcbiAqIFwiL3lvdXR1YmUtZG93bmxvYWRcIiByb3V0ZVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERvd25sb2FkVHViZVJvdXRlIGV4dGVuZHMgQmFzZVJvdXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSByb3V0ZVxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSByb3V0ZXIge1JvdXRlcn0gVGhlIEV4cHJlc3MgUm91dGVyLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShyb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0Rvd25sb2FkVHViZVJvdXRlOjpjcmVhdGVdIENyZWF0aW5nIHlvdXR1YmUgZG93bmxvYWQgcm91dGUuXCIpO1xyXG5cclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3lvdXR1YmUtZG93bmxvYWQvOnZpZGVvSURcIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBEb3dubG9hZFR1YmVSb3V0ZSgpLmRvd25sb2FkKHJlcSwgcmVzLCBuZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIERvd25sb2FkVHViZVJvdXRlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0dWJlIGRvd25sb2FkIHBhZ2Ugcm91dGUuXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIERvd25sb2FkVHViZVJvdXRlXHJcbiAgICAgKiBAbWV0aG9kIGRvd25sb2FkXHJcbiAgICAgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgRXhwcmVzcyBSZXF1ZXN0IG9iamVjdC5cclxuICAgICAqIEBwYXJhbSByZXMge1Jlc3BvbnNlfSBUaGUgRXhwcmVzcyBSZXNwb25zZSBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gbmV4dCB7TmV4dEZ1bmN0aW9ufSBFeGVjdXRlIHRoZSBuZXh0IG1ldGhvZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvd25sb2FkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLy8gdGhpcy5kb3dubG9hZEF1ZGlvVG9Sb290KHJlcSwgcmVzKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJNdXNpUSBEb3dubG9hZCBUdWJlXCI7XHJcbiAgICAgICAgdGhpcy5zdHJlYW1BdWRpbyhyZXEsIHJlcyk7XHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJlYW1BdWRpbyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICBsZXQgdmlkZW9fVVJMID0gYGh0dHA6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0ke3JlcS5wYXJhbXMudmlkZW9JRH1gO1xyXG4gICAgICAgIGxldCB5b3V0dWJlRGxVcmw6c3RyaW5nID0gJyc7XHJcbiAgICAgICAgbGV0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcigndXRmOCcpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0geyBlbmNvZGluZzogJ3V0ZjgnfTtcclxuXHJcbiAgICAgICAgLy8gIyBTcGF3biBhIGNoaWxkIHByb2Nlc3MgdG8gb2J0YWluIHRoZSBVUkwgdG8gdGhlIEZMVih0byB0aGUgeW91dHViZSB2aWQpXHJcbiAgICAgICAgbGV0IHlvdXR1YmVEbFVybENoaWxkID0gc3Bhd24oJy4vZGlzdC95b3V0dWJlX2RsL3lvdXR1YmUtZGwnLCBbJy0tc2ltdWxhdGUnLCAnLS1nZXQtdXJsJywgdmlkZW9fVVJMXSk7XHJcbiAgICAgICAgeW91dHViZURsVXJsQ2hpbGQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGE6QnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHlvdXR1YmVEbFVybCArPSBkZWNvZGVyLndyaXRlKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB5b3V0dWJlRGxVcmxDaGlsZC5zdGRvdXQub24oJ2VuZCcsICgpID0+IHtcclxuICAgICAgICAgICAgLy9Db252ZXJ0aW5nIHRoZSBidWZmZXIgdG8gYSBzdHJpbmcgaXMgYSBsaXR0bGUgY29zdGx5IHNvIGxldCdzIGRvIGl0IHVwZnJvbnRcclxuICAgICAgICAgICAgeW91dHViZURsVXJsID0geW91dHViZURsVXJsLnN1YnN0cmluZygwLCB5b3V0dWJlRGxVcmwubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTSUUgVVJMIElaOiAke3lvdXR1YmVEbFVybH1gKTtcclxuICAgICAgICAgICAgLy8gIyBCZWZvcmUgd2Ugd3JpdGUgdGhlIG91dHB1dCwgZW5zdXJlIHRoYXQgd2UncmUgc2VuZGluZyBpdCBiYWNrIHdpdGggdGhlIHByb3BlciBjb250ZW50IHR5cGVcclxuICAgICAgICAgICAgLy8gIyBDcmVhdGUgYW4gZmZtcGVnIHByb2Nlc3MgdG8gZmVlZCB0aGUgdmlkZW8gdG8uXHJcbiAgICAgICAgICAgIGxldCBmZm1wZWdfY2hpbGQgPSBzcGF3biAoXCJmZm1wZWdcIiwgWyctaScsICdwaXBlOjAnLCAnLWFjb2RlYycsIC8qJ2xpYm1wM2xhbWUnLCovICctZicsICdtcDMnLCAnLSddKTtcclxuICAgICAgICAgICAgLy8gIyBTZXR0aW5nIHVwIHRoZSBvdXRwdXQgcGlwZSBiZWZvcmUgd2Ugc2V0IHVwIHRoZSBpbnB1dCBwaXBlIGVuc3VyZXMgd2Vkb24ndCBsb29zZSBhbnkgZGF0YS5cclxuICAgICAgICAgICAgZmZtcGVnX2NoaWxkLnN0ZG91dC5waXBlKHJlcyk7XHJcbiAgICAgICAgICAgIC8vICMgR0VUIHRoZSBGTFYsIHBpcGUgdGhlIHJlc3BvbnNlJ3MgYm9keSB0byBvdXIgZmZtcGVnIHByb2Nlc3MuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJpOiB5b3V0dWJlRGxVcmwsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ1lvdXR1YmVkbC1uby1jb21wcmVzc2lvbic6ICdUcnVlJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2F1ZGlvL21wZWczJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICAgICAgfSkucGlwZShmZm1wZWdfY2hpbGQuc3RkaW4pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvd25sb2FkQXVkaW9Ub1Jvb3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgIGxldCB2aWRlb19VUkwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0keyByZXEucGFyYW1zLnZpZGVvSUR9YDtcclxuXHJcbiAgICAgICAgbGV0IHR1YmVfZGwgPSBzcGF3bignLi9kaXN0L3lvdXR1YmVfZGwveW91dHViZS1kbCcsIFsnLS1leHRyYWN0LWF1ZGlvJywgJy0tYXVkaW8tZm9ybWF0JywgJ21wMycsICctLWF1ZGlvLXF1YWxpdHknLCAnOScsIHZpZGVvX1VSTF0pO1xyXG5cclxuICAgICAgICBsZXQgZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKCd1dGY4Jyk7XHJcbiAgICAgICAgbGV0IGRhdGFTdHI6c3RyaW5nO1xyXG4gICAgICAgIGxldCBmaWxlTmFtZTpzdHJpbmc7XHJcblxyXG4gICAgICAgIHR1YmVfZGwuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGE6IEJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICBkYXRhU3RyID0gZGVjb2Rlci53cml0ZShkYXRhKTtcclxuICAgICAgICAgICAgaWYoZGF0YVN0ci5pbmRleE9mKCdtcDMnKSAhPT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IGdldFN1YlN0cmluZ0JldHdlZW5Ud29TdHJpbmdzKGRhdGFTdHIsICdEZXN0aW5hdGlvbjogJywgYC0ke3JlcS5wYXJhbXMudmlkZW9JRH0ubXAzYCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRklMRSBOQU1FIElaOiAke2ZpbGVOYW1lfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVfZGwuc3Rkb3V0Lm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFTdHIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlX2RsLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7ZGF0YX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5vbignZXhpdCcsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLnJlYWRGaWxlKGAuLyR7ZmlsZU5hbWV9JHtyZXEucGFyYW1zLnZpZGVvSUR9Lm1wM2AsIChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIHNldCBvdXIgY29udGVudCB0eXBlIHNvIGNvbnN1bWVycyBvZiBvdXIgQVBJIGtub3cgd2hhdCB0aGV5IGFyZSBnZXR0aW5nXHJcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXVkaW8vbXBlZzMnKTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5vbignY2xvc2UnLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY2hpbGQgcHJvY2VzcyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIuLiJ9
