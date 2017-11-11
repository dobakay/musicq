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
        router.get("/youtube-download/", function (req, res, next) {
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
        var tube_dl = child_process_1.spawn('../youtube-dl/youtube-dl', [' --extract-audio', '--audio-format', 'mp3 ', video_URL]);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQXNDO0FBQ3RDLCtDQUFzQztBQUN0QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdkI7OztHQUdHO0FBQ0g7SUFBdUMscUNBQVM7SUFrQjVDOzs7OztPQUtHO0lBQ0g7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUF4QkQ7Ozs7Ozs7T0FPRztJQUNXLHdCQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1lBQzdFLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZRDs7Ozs7Ozs7T0FRRztJQUNJLG9DQUFRLEdBQWYsVUFBZ0IsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtRQUEvRCxpQkFpREM7UUEvQ0csSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUVuQyxJQUFJLFNBQVMsR0FBRyx5REFBeUQsQ0FBQTtRQUN6RSxJQUFNLE9BQU8sR0FBRyxxQkFBSyxDQUFDLDBCQUEwQixFQUFFLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFN0csT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQVcsSUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxJQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUxQixFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUE2QixFQUFFLFVBQUMsR0FBVSxFQUFFLElBQVM7Z0JBQzdELDZFQUE2RTtnQkFDN0UsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsSUFBSTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFrQyxJQUFNLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUdILHNFQUFzRTtRQUN0RSx1SkFBdUo7UUFFdkosOERBQThEO1FBQzlELHlDQUF5QztRQUN6QyxrQ0FBa0M7UUFDbEMsZ0VBQWdFO1FBQ2hFLDZDQUE2QztRQUM3QyxvQ0FBb0M7UUFDcEMsZ0RBQWdEO1FBQ2hELDJCQUEyQjtRQUMzQixzRUFBc0U7UUFDdEUsK0VBQStFO1FBQy9FLG1EQUFtRDtJQUV2RCxDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQXhGQSxBQXdGQyxDQXhGc0MscUJBQVMsR0F3Ri9DO0FBeEZZLDhDQUFpQiIsImZpbGUiOiJyb3V0ZXMvRG93bmxvYWRUdWJlUm91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UsIFJvdXRlcn0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtCYXNlUm91dGV9IGZyb20gXCIuL0Jhc2VSb3V0ZVwiO1xyXG5pbXBvcnQgeyBzcGF3biB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbnZhciBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcclxuXHJcbi8qKlxyXG4gKiBcIi95b3V0dWJlLWRvd25sb2FkXCIgcm91dGVcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb3dubG9hZFR1YmVSb3V0ZSBleHRlbmRzIEJhc2VSb3V0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgcm91dGVcclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBtZXRob2QgY3JlYXRlXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyIHtSb3V0ZXJ9IFRoZSBFeHByZXNzIFJvdXRlci5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltEb3dubG9hZFR1YmVSb3V0ZTo6Y3JlYXRlXSBDcmVhdGluZyB5b3V0dWJlIGRvd25sb2FkIHJvdXRlLlwiKTtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi95b3V0dWJlLWRvd25sb2FkL1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgbmV3IERvd25sb2FkVHViZVJvdXRlKCkuZG93bmxvYWQocmVxLCByZXMsIG5leHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHR1YmUgZG93bmxvYWQgcGFnZSByb3V0ZS5cclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgRG93bmxvYWRUdWJlUm91dGVcclxuICAgICAqIEBtZXRob2QgZG93bmxvYWRcclxuICAgICAqIEBwYXJhbSByZXEge1JlcXVlc3R9IFRoZSBFeHByZXNzIFJlcXVlc3Qgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSBFeHByZXNzIFJlc3BvbnNlIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSBuZXh0IHtOZXh0RnVuY3Rpb259IEV4ZWN1dGUgdGhlIG5leHQgbWV0aG9kLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG93bmxvYWQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuXHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiTXVzaVEgRG93bmxvYWQgVHViZVwiO1xyXG5cclxuICAgICAgICBsZXQgdmlkZW9fVVJMID0gXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSR7IHJlcS5wYXJhbXMudmlkZW9JRCB9XCJcclxuICAgICAgICBjb25zdCB0dWJlX2RsID0gc3Bhd24oJy4uL3lvdXR1YmUtZGwveW91dHViZS1kbCcsIFsnIC0tZXh0cmFjdC1hdWRpbycsICctLWF1ZGlvLWZvcm1hdCcsICdtcDMgJywgdmlkZW9fVVJMXSk7XHJcblxyXG4gICAgICAgIHR1YmVfZGwuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtkYXRhfWApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0dWJlX2RsLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7ZGF0YX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5vbignZXhpdCcsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBcmd1bWVudHM6Jyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVFVCRV9ETCBjaGlsZCBwcm9jZXNzOicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0dWJlX2RsKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0VuZCBvZiBMT0cnKTtcclxuXHJcbiAgICAgICAgICAgIGZzLnJlYWRGaWxlKFwiLi8je3JlcS5wYXJhbXMudmlkZW9JRH0ubXAzXCIsIChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIHNldCBvdXIgY29udGVudCB0eXBlIHNvIGNvbnN1bWVycyBvZiBvdXIgQVBJIGtub3cgd2hhdCB0aGV5IGFyZSBnZXR0aW5nXHJcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXVkaW8vbXBlZzMnKTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHViZV9kbC5vbignY2xvc2UnLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgY2hpbGQgcHJvY2VzcyBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vICMgU3Bhd24gYSBjaGlsZCBwcm9jZXNzIHRvIG9idGFpbiBGTFYgYW5kIHVzZSBmZm1wZWcgdG8gY29udmVydCBpdC5cclxuICAgICAgICAvLyAgICAgeW91dHViZV9kbCA9IHNwYXduICcuL3lvdXR1YmUtZGwnLCBbJy0tZXh0cmFjdC1hdWRpbycsICctLWF1ZGlvLWZvcm1hdCcsICdtcDMnLCBcImh0dHA6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0je3JlcS5wYXJhbXMueW91dHViZV92aWRlb19pZH1cIl1cclxuXHJcbiAgICAgICAgLy8gIyBMZXQncyBlY2hvIHRoZSBvdXRwdXQgb2YgdGhlIGNoaWxkIHRvIHNlZSB3aGF0J3MgZ29pbmcgb25cclxuICAgICAgICAvLyB5b3V0dWJlX2RsLnN0ZG91dC5vbiAnZGF0YScsIChkYXRhKSAtPlxyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyBkYXRhLnRvU3RyaW5nKClcclxuICAgICAgICAvLyAjIEluY2FzZSBzb21ldGhpbmcgYmFkIGhhcHBlbnMsIHdlIHNob3VsZCB3cml0ZSB0aGF0IG91dCB0b28uXHJcbiAgICAgICAgLy8gICAgIHlvdXR1YmVfZGwuc3RkZXJyLm9uICdkYXRhJywgKGRhdGEpIC0+XHJcbiAgICAgICAgLy8gICAgICAgICBwcm9jZXNzLnN0ZGVyci53cml0ZSBkYXRhXHJcbiAgICAgICAgLy8gIyB3aGVuIHdlJ3JlIGRvbmUsIGxldCdzIHNlbmQgYmFjayB0aGUgb3V0cHV0XHJcbiAgICAgICAgLy8geW91dHViZV9kbC5vbiAnZXhpdCcsIC0+XHJcbiAgICAgICAgLy8gICAgIHJlYWRGaWxlIFwiLi8je3JlcS5wYXJhbXMueW91dHViZV92aWRlb19pZH0ubXAzXCIsIChlcnIsIGRhdGEpIC0+XHJcbiAgICAgICAgLy8gIyBXZSBzZXQgb3VyIGNvbnRlbnQgdHlwZSBzbyBjb25zdW1lcnMgb2Ygb3VyIEFQSSBrbm93IHdoYXQgdGhleSBhcmUgZ2V0dGluZ1xyXG4gICAgICAgIC8vIHJlcy5zZW5kIGRhdGEsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhdWRpby9tcGVnMycgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii4uIn0=
