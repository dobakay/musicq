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
        this.title = "MusiQ Download Tube";
        var video_URL = "https://www.youtube.com/watch?v=" + req.params.videoID;
        var tube_dl = child_process_1.spawn('./dist/youtube_dl/youtube-dl', ['--extract-audio', '--audio-format', 'mp3', '--audio-quality', '9', video_URL]);
        var decoder = new string_decoder_1.StringDecoder('utf8');
        var dataStr = null;
        var fileName = null;
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
            // console.log('Arguments:');
            // console.log(this);
            // console.log('TUBE_DL child process:');
            // console.log(tube_dl);
            // console.log('End of LOG');
            fs.readFile("./#{req.params.videoID}.mp3", function (err, data) {
                // We set our content type so consumers of our API know what they are getting
                res.setHeader('Content-Type', 'audio/mpeg3');
                res.send(data);
            });
        });
        tube_dl.on('close', function (code) {
            console.log("child process exited with code " + code);
        });
        // # Spawn a child process to obtain FLV and use ffmpeg to convert it.
        //     youtube_dl = spawn './youtube-dl', ['--extract-audio', '--audio-format', 'mp3', "http://www.youtube.com/watch?v=#{req.params.youtube_video_id}"]
        // # Let's echo the output of the child to see what's going on
        // youtube_dl.stdout.on 'data', (data) ->
        //     console.log data.toString()
        // # Incase something bad happens, we should write that out too.
        //     youtube_dl.stderr.on 'data', (data) ->
        //         process.stderr.write data
        // # when we're done, let's send back the output
        // youtube_dl.on 'exit', ->
        //     readFile "./#{req.params.youtube_video_id}.mp3", (err, data) ->
        // # We set our content type so consumers of our API know what they are getting
        // res.send data, { 'Content-Type': 'audio/mpeg3' }
    };
    return DownloadTubeRoute;
}(BaseRoute_1.BaseRoute));
exports.DownloadTubeRoute = DownloadTubeRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUFzQztBQUN0QyxrQ0FBa0U7QUFDbEUsaURBQStDO0FBRS9DOzs7R0FHRztBQUNIO0lBQXVDLHFDQUFTO0lBa0I1Qzs7Ozs7T0FLRztJQUNIO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBeEJEOzs7Ozs7O09BT0c7SUFDVyx3QkFBTSxHQUFwQixVQUFxQixNQUFjO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsOERBQThELENBQUMsQ0FBQztRQUU1RSxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtZQUNyRixJQUFJLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBWUQ7Ozs7Ozs7O09BUUc7SUFDSSxvQ0FBUSxHQUFmLFVBQWdCLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFFM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUVuQyxJQUFJLFNBQVMsR0FBRyxxQ0FBb0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFTLENBQUM7UUFFekUsSUFBSSxPQUFPLEdBQUcscUJBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUVySSxJQUFJLE9BQU8sR0FBRyxJQUFJLDhCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQVUsSUFBSSxDQUFDO1FBQzFCLElBQUksUUFBUSxHQUFVLElBQUksQ0FBQztRQUUzQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFZO1lBQ25DLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixRQUFRLEdBQUcscUNBQTZCLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxTQUFNLENBQUMsQ0FBQztnQkFDakcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBaUIsUUFBVSxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxJQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUNwQiw2QkFBNkI7WUFDN0IscUJBQXFCO1lBQ3JCLHlDQUF5QztZQUN6Qyx3QkFBd0I7WUFDeEIsNkJBQTZCO1lBSTdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLEVBQUUsVUFBQyxHQUFVLEVBQUUsSUFBUztnQkFDN0QsNkVBQTZFO2dCQUM3RSxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxJQUFJO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQWtDLElBQU0sQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBR0gsc0VBQXNFO1FBQ3RFLHVKQUF1SjtRQUV2Siw4REFBOEQ7UUFDOUQseUNBQXlDO1FBQ3pDLGtDQUFrQztRQUNsQyxnRUFBZ0U7UUFDaEUsNkNBQTZDO1FBQzdDLG9DQUFvQztRQUNwQyxnREFBZ0Q7UUFDaEQsMkJBQTJCO1FBQzNCLHNFQUFzRTtRQUN0RSwrRUFBK0U7UUFDL0UsbURBQW1EO0lBRXZELENBQUM7SUFFTCx3QkFBQztBQUFELENBeEdBLEFBd0dDLENBeEdzQyxxQkFBUyxHQXdHL0M7QUF4R1ksOENBQWlCIiwiZmlsZSI6InJvdXRlcy9Eb3dubG9hZFR1YmVSb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQge0Jhc2VSb3V0ZX0gZnJvbSBcIi4vQmFzZVJvdXRlXCI7XHJcbmltcG9ydCB7IHNwYXduIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuaW1wb3J0IHsgZnJvbURpciwgZ2V0U3ViU3RyaW5nQmV0d2VlblR3b1N0cmluZ3MgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgU3RyaW5nRGVjb2RlciB9IGZyb20gJ3N0cmluZ19kZWNvZGVyJztcclxuXHJcbi8qKlxyXG4gKiBcIi95b3V0dWJlLWRvd25sb2FkXCIgcm91dGVcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZSBleHRlbmRzIEJhc2VSb3V0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgcm91dGVcclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBtZXRob2QgY3JlYXRlXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyIHtSb3V0ZXJ9IFRoZSBFeHByZXNzIFJvdXRlci5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltEb3dubG9hZFR1YmVSb3V0ZTo6Y3JlYXRlXSBDcmVhdGluZyB5b3V0dWJlIGRvd25sb2FkIHJvdXRlLlwiKTtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi95b3V0dWJlLWRvd25sb2FkLzp2aWRlb0lEXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBuZXcgRG93bmxvYWRUdWJlUm91dGUoKS5kb3dubG9hZChyZXEsIHJlcywgbmV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHViZSBkb3dubG9hZCBwYWdlIHJvdXRlLlxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBkb3dubG9hZFxyXG4gICAgICogQHBhcmFtIHJlcSB7UmVxdWVzdH0gVGhlIEV4cHJlc3MgUmVxdWVzdCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gcmVzIHtSZXNwb25zZX0gVGhlIEV4cHJlc3MgUmVzcG9uc2Ugb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gRXhlY3V0ZSB0aGUgbmV4dCBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG5cclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJNdXNpUSBEb3dubG9hZCBUdWJlXCI7XHJcblxyXG4gICAgICAgIGxldCB2aWRlb19VUkwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0keyByZXEucGFyYW1zLnZpZGVvSUR9YDtcclxuXHJcbiAgICAgICAgbGV0IHR1YmVfZGwgPSBzcGF3bignLi9kaXN0L3lvdXR1YmVfZGwveW91dHViZS1kbCcsIFsnLS1leHRyYWN0LWF1ZGlvJywgJy0tYXVkaW8tZm9ybWF0JywgJ21wMycsICctLWF1ZGlvLXF1YWxpdHknLCAnOScsIHZpZGVvX1VSTF0pO1xyXG5cclxuICAgICAgICBsZXQgZGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKCd1dGY4Jyk7XHJcbiAgICAgICAgbGV0IGRhdGFTdHI6c3RyaW5nID0gbnVsbDtcclxuICAgICAgICBsZXQgZmlsZU5hbWU6c3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICAgICAgdHViZV9kbC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YTogQnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFTdHIgPSBkZWNvZGVyLndyaXRlKGRhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhU3RyLmluZGV4T2YoJ21wMycpICE9PSAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gZ2V0U3ViU3RyaW5nQmV0d2VlblR3b1N0cmluZ3MoZGF0YVN0ciwgJ0Rlc3RpbmF0aW9uOiAnLCBgLSR7cmVxLnBhcmFtcy52aWRlb0lEfS5tcDNgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGSUxFIE5BTUUgSVo6ICR7ZmlsZU5hbWV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5zdGRvdXQub24oJ2VuZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVN0cik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVfZGwuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHN0ZGVycjogJHtkYXRhfWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlX2RsLm9uKCdleGl0JywgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0FyZ3VtZW50czonKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdUVUJFX0RMIGNoaWxkIHByb2Nlc3M6Jyk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR1YmVfZGwpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnRW5kIG9mIExPRycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBmcy5yZWFkRmlsZShcIi4vI3tyZXEucGFyYW1zLnZpZGVvSUR9Lm1wM1wiLCAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBzZXQgb3VyIGNvbnRlbnQgdHlwZSBzbyBjb25zdW1lcnMgb2Ygb3VyIEFQSSBrbm93IHdoYXQgdGhleSBhcmUgZ2V0dGluZ1xyXG4gICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2F1ZGlvL21wZWczJyk7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZChkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVfZGwub24oJ2Nsb3NlJywgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGNoaWxkIHByb2Nlc3MgZXhpdGVkIHdpdGggY29kZSAke2NvZGV9YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvLyAjIFNwYXduIGEgY2hpbGQgcHJvY2VzcyB0byBvYnRhaW4gRkxWIGFuZCB1c2UgZmZtcGVnIHRvIGNvbnZlcnQgaXQuXHJcbiAgICAgICAgLy8gICAgIHlvdXR1YmVfZGwgPSBzcGF3biAnLi95b3V0dWJlLWRsJywgWyctLWV4dHJhY3QtYXVkaW8nLCAnLS1hdWRpby1mb3JtYXQnLCAnbXAzJywgXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9I3tyZXEucGFyYW1zLnlvdXR1YmVfdmlkZW9faWR9XCJdXHJcblxyXG4gICAgICAgIC8vICMgTGV0J3MgZWNobyB0aGUgb3V0cHV0IG9mIHRoZSBjaGlsZCB0byBzZWUgd2hhdCdzIGdvaW5nIG9uXHJcbiAgICAgICAgLy8geW91dHViZV9kbC5zdGRvdXQub24gJ2RhdGEnLCAoZGF0YSkgLT5cclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2cgZGF0YS50b1N0cmluZygpXHJcbiAgICAgICAgLy8gIyBJbmNhc2Ugc29tZXRoaW5nIGJhZCBoYXBwZW5zLCB3ZSBzaG91bGQgd3JpdGUgdGhhdCBvdXQgdG9vLlxyXG4gICAgICAgIC8vICAgICB5b3V0dWJlX2RsLnN0ZGVyci5vbiAnZGF0YScsIChkYXRhKSAtPlxyXG4gICAgICAgIC8vICAgICAgICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUgZGF0YVxyXG4gICAgICAgIC8vICMgd2hlbiB3ZSdyZSBkb25lLCBsZXQncyBzZW5kIGJhY2sgdGhlIG91dHB1dFxyXG4gICAgICAgIC8vIHlvdXR1YmVfZGwub24gJ2V4aXQnLCAtPlxyXG4gICAgICAgIC8vICAgICByZWFkRmlsZSBcIi4vI3tyZXEucGFyYW1zLnlvdXR1YmVfdmlkZW9faWR9Lm1wM1wiLCAoZXJyLCBkYXRhKSAtPlxyXG4gICAgICAgIC8vICMgV2Ugc2V0IG91ciBjb250ZW50IHR5cGUgc28gY29uc3VtZXJzIG9mIG91ciBBUEkga25vdyB3aGF0IHRoZXkgYXJlIGdldHRpbmdcclxuICAgICAgICAvLyByZXMuc2VuZCBkYXRhLCB7ICdDb250ZW50LVR5cGUnOiAnYXVkaW8vbXBlZzMnIH1cclxuXHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIuLiJ9
