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
/**
 * "/" route
 *
 * @class IndexRoute
 */
var IndexRoute = /** @class */ (function (_super) {
    __extends(IndexRoute, _super);
    /**
     * Constructor
     *
     * @class IndexRoute
     * @costructor
     */
    function IndexRoute() {
        return _super.call(this) || this;
    }
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @param router {Router} The Express Router.
     * @static
     */
    IndexRoute.create = function (router) {
        console.log("[IndexRouter::create] Creating index route.");
        router.get("/", function (req, res, next) {
            new IndexRoute().index(req, res, next);
        });
    };
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    IndexRoute.prototype.index = function (req, res, next) {
        // set custom title
        this.title = "MusiqQ Home";
        //set options
        var options = {
            "message": "Welcome to MusicQ. Your party friend."
        };
        // render template
        this.render(req, res, "index", options);
    };
    return IndexRoute;
}(BaseRoute_1.BaseRoute));
exports.IndexRoute = IndexRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvSW5kZXhSb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBc0M7QUFFdEM7Ozs7R0FJRztBQUNIO0lBQWdDLDhCQUFTO0lBaUJwQzs7Ozs7T0FLRztJQUNGO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBeEJIOzs7Ozs7O09BT0c7SUFDWSxpQkFBTSxHQUFwQixVQUFxQixNQUFjO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQztRQUUzRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDNUQsSUFBSSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZQTs7Ozs7Ozs7T0FRRztJQUNLLDBCQUFLLEdBQVosVUFBYSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ3hELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUUzQixhQUFhO1FBQ2IsSUFBSSxPQUFPLEdBQVc7WUFDbEIsU0FBUyxFQUFFLHVDQUF1QztTQUNyRCxDQUFDO1FBRUYsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVSLGlCQUFDO0FBQUQsQ0FqREEsQUFpREMsQ0FqRCtCLHFCQUFTLEdBaUR4QztBQWpEWSxnQ0FBVSIsImZpbGUiOiJyb3V0ZXMvSW5kZXhSb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQge0Jhc2VSb3V0ZX0gZnJvbSBcIi4vQmFzZVJvdXRlXCI7XHJcblxyXG4vKipcclxuICogXCIvXCIgcm91dGVcclxuICogXHJcbiAqIEBjbGFzcyBJbmRleFJvdXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW5kZXhSb3V0ZSBleHRlbmRzIEJhc2VSb3V0ZSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0aGUgcm91dGVzLlxyXG4gICAgICogXHJcbiAgICAgKiBAY2xhc3MgSW5kZXhSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSByb3V0ZXIge1JvdXRlcn0gVGhlIEV4cHJlc3MgUm91dGVyLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJbSW5kZXhSb3V0ZXI6OmNyZWF0ZV0gQ3JlYXRpbmcgaW5kZXggcm91dGUuXCIpO1xyXG5cclxuICAgICAgICAgcm91dGVyLmdldChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICBuZXcgSW5kZXhSb3V0ZSgpLmluZGV4KHJlcSwgcmVzLCBuZXh0KTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICAqXHJcbiAgICAgICogQGNsYXNzIEluZGV4Um91dGVcclxuICAgICAgKiBAY29zdHJ1Y3RvclxyXG4gICAgICAqL1xyXG4gICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaGUgaG9tZSBwYWdlIHJvdXRlLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAY2xhc3MgSW5kZXhSb3V0ZVxyXG4gICAgICAgKiBAbWV0aG9kIGluZGV4XHJcbiAgICAgICAqIEBwYXJhbSByZXEge1JlcXVlc3R9IFRoZSBFeHByZXNzIFJlcXVlc3Qgb2JqZWN0LlxyXG4gICAgICAgKiBAcGFyYW0gcmVzIHtSZXNwb25zZX0gVGhlIEV4cHJlc3MgUmVzcG9uc2Ugb2JqZWN0LlxyXG4gICAgICAgKiBAcGFyYW0gbmV4dCB7TmV4dEZ1bmN0aW9ufSBFeGVjdXRlIHRoZSBuZXh0IG1ldGhvZC5cclxuICAgICAgICovXHJcbiAgICAgICBwdWJsaWMgaW5kZXgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICAgICAvLyBzZXQgY3VzdG9tIHRpdGxlXHJcbiAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiTXVzaXFRIEhvbWVcIjtcclxuXHJcbiAgICAgICAgICAgLy9zZXQgb3B0aW9uc1xyXG4gICAgICAgICAgIGxldCBvcHRpb25zOiBPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIldlbGNvbWUgdG8gTXVzaWNRLiBZb3VyIHBhcnR5IGZyaWVuZC5cIlxyXG4gICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgIC8vIHJlbmRlciB0ZW1wbGF0ZVxyXG4gICAgICAgICAgIHRoaXMucmVuZGVyKHJlcSwgcmVzLFwiaW5kZXhcIiwgb3B0aW9ucyk7XHJcbiAgICAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIuLiJ9
