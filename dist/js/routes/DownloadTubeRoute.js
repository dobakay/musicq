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
        var _this = this;
        this.title = "MusiQ Download Tube";
        var video_URL = "https://www.youtube.com/watch?v=${ req.params.videoID }";
        var tube_dl = child_process_1.spawn('../../youtube-dl/youtube-dl', [' --extract-audio', '--audio-format', 'mp3 ', video_URL]);
        tube_dl.stdout.on('data', function (data) {
            console.log("stdout: " + data);
        });
        tube_dl.stderr.on('data', function (data) {
            console.log("stderr: " + data);
        });
        tube_dl.on('exit', function (code) {
            console.log('Arguments:');
            console.log(_this);
            console.log('TUBE_DL child process:');
            console.log(tube_dl);
            console.log('End of LOG');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUFzQztBQUN0QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkI7OztHQUdHO0FBQ0g7SUFBdUMscUNBQVM7SUFrQjVDOzs7OztPQUtHO0lBQ0g7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUF4QkQ7Ozs7Ozs7T0FPRztJQUNXLHdCQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQ3JGLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZRDs7Ozs7Ozs7T0FRRztJQUNJLG9DQUFRLEdBQWYsVUFBZ0IsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUEvRCxpQkFpREM7UUEvQ0csSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUVuQyxJQUFJLFNBQVMsR0FBRyx5REFBeUQsQ0FBQTtRQUN6RSxJQUFNLE9BQU8sR0FBRyxxQkFBSyxDQUFDLDZCQUE2QixFQUFFLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFaEgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQVcsSUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxJQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUxQixFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUE2QixFQUFFLFVBQUMsR0FBVSxFQUFFLElBQVM7Z0JBQzdELDZFQUE2RTtnQkFDN0UsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsSUFBSTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFrQyxJQUFNLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUdILHNFQUFzRTtRQUN0RSx1SkFBdUo7UUFFdkosOERBQThEO1FBQzlELHlDQUF5QztRQUN6QyxrQ0FBa0M7UUFDbEMsZ0VBQWdFO1FBQ2hFLDZDQUE2QztRQUM3QyxvQ0FBb0M7UUFDcEMsZ0RBQWdEO1FBQ2hELDJCQUEyQjtRQUMzQixzRUFBc0U7UUFDdEUsK0VBQStFO1FBQy9FLG1EQUFtRDtJQUV2RCxDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQXhGQSxBQXdGQyxDQXhGc0MscUJBQVMsR0F3Ri9DO0FBeEZZLDhDQUFpQiIsImZpbGUiOiJyb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UsIFJvdXRlcn0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtCYXNlUm91dGV9IGZyb20gXCIuL0Jhc2VSb3V0ZVwiO1xyXG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcclxuXHJcbi8qKlxyXG4gKiBcIi95b3V0dWJlLWRvd25sb2FkXCIgcm91dGVcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZSBleHRlbmRzIEJhc2VSb3V0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgcm91dGVcclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBtZXRob2QgY3JlYXRlXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyIHtSb3V0ZXJ9IFRoZSBFeHByZXNzIFJvdXRlci5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltEb3dubG9hZFR1YmVSb3V0ZTo6Y3JlYXRlXSBDcmVhdGluZyB5b3V0dWJlIGRvd25sb2FkIHJvdXRlLlwiKTtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi95b3V0dWJlLWRvd25sb2FkLzp2aWRlb0lEXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBuZXcgRG93bmxvYWRUdWJlUm91dGUoKS5kb3dubG9hZChyZXEsIHJlcywgbmV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHViZSBkb3dubG9hZCBwYWdlIHJvdXRlLlxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBkb3dubG9hZFxyXG4gICAgICogQHBhcmFtIHJlcSB7UmVxdWVzdH0gVGhlIEV4cHJlc3MgUmVxdWVzdCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gcmVzIHtSZXNwb25zZX0gVGhlIEV4cHJlc3MgUmVzcG9uc2Ugb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gRXhlY3V0ZSB0aGUgbmV4dCBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG5cclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJNdXNpUSBEb3dubG9hZCBUdWJlXCI7XHJcblxyXG4gICAgICAgIGxldCB2aWRlb19VUkwgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9JHsgcmVxLnBhcmFtcy52aWRlb0lEIH1cIlxyXG4gICAgICAgIGNvbnN0IHR1YmVfZGwgPSBzcGF3bignLi4vLi4veW91dHViZS1kbC95b3V0dWJlLWRsJywgWycgLS1leHRyYWN0LWF1ZGlvJywgJy0tYXVkaW8tZm9ybWF0JywgJ21wMyAnLCB2aWRlb19VUkxdKTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgc3Rkb3V0OiAke2RhdGF9YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHR1YmVfZGwuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHN0ZGVycjogJHtkYXRhfWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlX2RsLm9uKCdleGl0JywgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FyZ3VtZW50czonKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUVUJFX0RMIGNoaWxkIHByb2Nlc3M6Jyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHR1YmVfZGwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRW5kIG9mIExPRycpO1xyXG5cclxuICAgICAgICAgICAgZnMucmVhZEZpbGUoXCIuLyN7cmVxLnBhcmFtcy52aWRlb0lEfS5tcDNcIiwgKGVycjogRXJyb3IsIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gV2Ugc2V0IG91ciBjb250ZW50IHR5cGUgc28gY29uc3VtZXJzIG9mIG91ciBBUEkga25vdyB3aGF0IHRoZXkgYXJlIGdldHRpbmdcclxuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhdWRpby9tcGVnMycpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlX2RsLm9uKCdjbG9zZScsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjaGlsZCBwcm9jZXNzIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gIyBTcGF3biBhIGNoaWxkIHByb2Nlc3MgdG8gb2J0YWluIEZMViBhbmQgdXNlIGZmbXBlZyB0byBjb252ZXJ0IGl0LlxyXG4gICAgICAgIC8vICAgICB5b3V0dWJlX2RsID0gc3Bhd24gJy4veW91dHViZS1kbCcsIFsnLS1leHRyYWN0LWF1ZGlvJywgJy0tYXVkaW8tZm9ybWF0JywgJ21wMycsIFwiaHR0cDovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSN7cmVxLnBhcmFtcy55b3V0dWJlX3ZpZGVvX2lkfVwiXVxyXG5cclxuICAgICAgICAvLyAjIExldCdzIGVjaG8gdGhlIG91dHB1dCBvZiB0aGUgY2hpbGQgdG8gc2VlIHdoYXQncyBnb2luZyBvblxyXG4gICAgICAgIC8vIHlvdXR1YmVfZGwuc3Rkb3V0Lm9uICdkYXRhJywgKGRhdGEpIC0+XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nIGRhdGEudG9TdHJpbmcoKVxyXG4gICAgICAgIC8vICMgSW5jYXNlIHNvbWV0aGluZyBiYWQgaGFwcGVucywgd2Ugc2hvdWxkIHdyaXRlIHRoYXQgb3V0IHRvby5cclxuICAgICAgICAvLyAgICAgeW91dHViZV9kbC5zdGRlcnIub24gJ2RhdGEnLCAoZGF0YSkgLT5cclxuICAgICAgICAvLyAgICAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlIGRhdGFcclxuICAgICAgICAvLyAjIHdoZW4gd2UncmUgZG9uZSwgbGV0J3Mgc2VuZCBiYWNrIHRoZSBvdXRwdXRcclxuICAgICAgICAvLyB5b3V0dWJlX2RsLm9uICdleGl0JywgLT5cclxuICAgICAgICAvLyAgICAgcmVhZEZpbGUgXCIuLyN7cmVxLnBhcmFtcy55b3V0dWJlX3ZpZGVvX2lkfS5tcDNcIiwgKGVyciwgZGF0YSkgLT5cclxuICAgICAgICAvLyAjIFdlIHNldCBvdXIgY29udGVudCB0eXBlIHNvIGNvbnN1bWVycyBvZiBvdXIgQVBJIGtub3cgd2hhdCB0aGV5IGFyZSBnZXR0aW5nXHJcbiAgICAgICAgLy8gcmVzLnNlbmQgZGF0YSwgeyAnQ29udGVudC1UeXBlJzogJ2F1ZGlvL21wZWczJyB9XHJcblxyXG4gICAgfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiLi4ifQ==
