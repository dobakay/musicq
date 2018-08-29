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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxrQ0FBa0U7QUFDbEUsaURBQStDO0FBRS9DLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV2Qjs7O0dBR0c7QUFDSDtJQUF1QyxxQ0FBUztJQWtCNUM7Ozs7O09BS0c7SUFDSDtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQXhCRDs7Ozs7OztPQU9HO0lBQ1csd0JBQU0sR0FBcEIsVUFBcUIsTUFBYztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFFNUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDckYsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQVlEOzs7Ozs7OztPQVFHO0lBQ0ksb0NBQVEsR0FBZixVQUFnQixHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQzNELHNDQUFzQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUM5RCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQjtRQUNsRCxJQUFJLFFBQVEsR0FBRyxpQ0FBaUMsR0FBRyxPQUFPLENBQUM7UUFDM0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sK0NBQW1CLEdBQTFCLFVBQTJCLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFFdEUsSUFBSSxRQUFRLEdBQUcscUNBQW9DLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBUyxDQUFDO1FBRXhFLElBQUksTUFBTSxHQUFHLHFCQUFLLENBQUMsOEJBQThCLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFbkksSUFBSSxPQUFPLEdBQUcsSUFBSSw4QkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLElBQUksT0FBZSxDQUFDO1FBQ3BCLElBQUksUUFBZ0IsQ0FBQztRQUVyQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFZO1lBQ2xDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoQyxRQUFRLEdBQUcscUNBQTZCLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxTQUFNLENBQUMsQ0FBQztnQkFDakcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBaUIsUUFBVSxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxJQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUNuQixFQUFFLENBQUMsUUFBUSxDQUFDLE9BQUssUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxTQUFNLEVBQUUsVUFBQyxHQUFVLEVBQUUsSUFBUztnQkFDeEUsNkVBQTZFO2dCQUM3RSxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLElBQUk7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBa0MsSUFBTSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQTNGQSxBQTJGQyxDQTNGc0MscUJBQVMsR0EyRi9DO0FBM0ZZLDhDQUFpQiIsImZpbGUiOiJyb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UsIFJvdXRlcn0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtCYXNlUm91dGV9IGZyb20gXCIuL0Jhc2VSb3V0ZVwiO1xyXG5pbXBvcnQgeyBzcGF3biwgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbmltcG9ydCB7IGZyb21EaXIsIGdldFN1YlN0cmluZ0JldHdlZW5Ud29TdHJpbmdzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IFN0cmluZ0RlY29kZXIgfSBmcm9tIFwic3RyaW5nX2RlY29kZXJcIjtcclxuaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tIFwicmVxdWVzdFwiO1xyXG52YXIgeXRTdHJlYW0gPSByZXF1aXJlKFwieW91dHViZS1hdWRpby1zdHJlYW1cIik7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcclxuXHJcbi8qKlxyXG4gKiBcIi95b3V0dWJlLWRvd25sb2FkXCIgcm91dGVcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZSBleHRlbmRzIEJhc2VSb3V0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgcm91dGVcclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBtZXRob2QgY3JlYXRlXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyIHtSb3V0ZXJ9IFRoZSBFeHByZXNzIFJvdXRlci5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltEb3dubG9hZFR1YmVSb3V0ZTo6Y3JlYXRlXSBDcmVhdGluZyB5b3V0dWJlIGRvd25sb2FkIHJvdXRlLlwiKTtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi95b3V0dWJlLWRvd25sb2FkLzp2aWRlb0lEXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBuZXcgRG93bmxvYWRUdWJlUm91dGUoKS5kb3dubG9hZChyZXEsIHJlcywgbmV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHViZSBkb3dubG9hZCBwYWdlIHJvdXRlLlxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBkb3dubG9hZFxyXG4gICAgICogQHBhcmFtIHJlcSB7UmVxdWVzdH0gVGhlIEV4cHJlc3MgUmVxdWVzdCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gcmVzIHtSZXNwb25zZX0gVGhlIEV4cHJlc3MgUmVzcG9uc2Ugb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gRXhlY3V0ZSB0aGUgbmV4dCBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIC8vIHRoaXMuZG93bmxvYWRBdWRpb1RvUm9vdChyZXEsIHJlcyk7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiTXVzaVEgRG93bmxvYWQgVHViZVwiO1xyXG4gICAgICAgIHRoaXMuc3RyZWFtQXVkaW8ocmVxLCByZXMsIG5leHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdHJlYW1BdWRpbyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCB2aWRlb0lEID0gcmVxLnBhcmFtcy52aWRlb0lEOyAvL1wiWlRZOHZsS085aGdcIjtcclxuICAgICAgICBsZXQgdmlkZW9VUkwgPSBcImh0dHA6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1cIiArIHZpZGVvSUQ7XHJcbiAgICAgICAgeXRTdHJlYW0odmlkZW9VUkwpLnBpcGUocmVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG93bmxvYWRBdWRpb1RvUm9vdChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBsZXQgdmlkZW9VUkwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0keyByZXEucGFyYW1zLnZpZGVvSUR9YDtcclxuXHJcbiAgICAgICAgbGV0IHR1YmVEbCA9IHNwYXduKFwiLi9kaXN0L3lvdXR1YmVfZGwveW91dHViZS1kbFwiLCBbXCItLWV4dHJhY3QtYXVkaW9cIiwgXCItLWF1ZGlvLWZvcm1hdFwiLCBcIm1wM1wiLCBcIi0tYXVkaW8tcXVhbGl0eVwiLCBcIjlcIiwgdmlkZW9VUkxdKTtcclxuXHJcbiAgICAgICAgbGV0IGRlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcihcInV0ZjhcIik7XHJcbiAgICAgICAgbGV0IGRhdGFTdHI6IHN0cmluZztcclxuICAgICAgICBsZXQgZmlsZU5hbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgdHViZURsLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGE6IEJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICBkYXRhU3RyID0gZGVjb2Rlci53cml0ZShkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGFTdHIuaW5kZXhPZihcIm1wM1wiKSAhPT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IGdldFN1YlN0cmluZ0JldHdlZW5Ud29TdHJpbmdzKGRhdGFTdHIsIFwiRGVzdGluYXRpb246IFwiLCBgLSR7cmVxLnBhcmFtcy52aWRlb0lEfS5tcDNgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGSUxFIE5BTUUgSVo6ICR7ZmlsZU5hbWV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZURsLnN0ZG91dC5vbihcImVuZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFTdHIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlRGwuc3RkZXJyLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc3RkZXJyOiAke2RhdGF9YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVEbC5vbihcImV4aXRcIiwgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgZnMucmVhZEZpbGUoYC4vJHtmaWxlTmFtZX0ke3JlcS5wYXJhbXMudmlkZW9JRH0ubXAzYCwgKGVycjogRXJyb3IsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gV2Ugc2V0IG91ciBjb250ZW50IHR5cGUgc28gY29uc3VtZXJzIG9mIG91ciBBUEkga25vdyB3aGF0IHRoZXkgYXJlIGdldHRpbmdcclxuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhdWRpby9tcGVnM1wiKTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgbmV4dCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZURsLm9uKFwiY2xvc2VcIiwgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGNoaWxkIHByb2Nlc3MgZXhpdGVkIHdpdGggY29kZSAke2NvZGV9YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFxzcmMifQ==
