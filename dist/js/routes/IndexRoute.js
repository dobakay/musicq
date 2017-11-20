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
     * @constructor
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
        console.log("[IndexRoute::create] Creating index route.");
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
        res.sendfile("./dist/www/dist/index.html");
    };
    return IndexRoute;
}(BaseRoute_1.BaseRoute));
exports.IndexRoute = IndexRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvSW5kZXhSb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBc0M7QUFFdEM7Ozs7R0FJRztBQUNIO0lBQWdDLDhCQUFTO0lBaUJwQzs7Ozs7T0FLRztJQUNGO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBeEJIOzs7Ozs7O09BT0c7SUFDWSxpQkFBTSxHQUFwQixVQUFxQixNQUFjO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUUxRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDNUQsSUFBSSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZQTs7Ozs7Ozs7T0FRRztJQUNLLDBCQUFLLEdBQVosVUFBYSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ3hELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUUzQixhQUFhO1FBQ2IsSUFBSSxPQUFPLEdBQVc7WUFDbEIsU0FBUyxFQUFFLHVDQUF1QztTQUNyRCxDQUFDO1FBQ0Ysa0JBQWtCO1FBQ2xCLEdBQUcsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRVIsaUJBQUM7QUFBRCxDQWhEQSxBQWdEQyxDQWhEK0IscUJBQVMsR0FnRHhDO0FBaERZLGdDQUFVIiwiZmlsZSI6InJvdXRlcy9JbmRleFJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlLCBSb3V0ZXJ9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7QmFzZVJvdXRlfSBmcm9tIFwiLi9CYXNlUm91dGVcIjtcclxuXHJcbi8qKlxyXG4gKiBcIi9cIiByb3V0ZVxyXG4gKlxyXG4gKiBAY2xhc3MgSW5kZXhSb3V0ZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEluZGV4Um91dGUgZXh0ZW5kcyBCYXNlUm91dGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdGhlIHJvdXRlcy5cclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgSW5kZXhSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSByb3V0ZXIge1JvdXRlcn0gVGhlIEV4cHJlc3MgUm91dGVyLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJbSW5kZXhSb3V0ZTo6Y3JlYXRlXSBDcmVhdGluZyBpbmRleCByb3V0ZS5cIik7XHJcblxyXG4gICAgICAgICByb3V0ZXIuZ2V0KFwiL1wiLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgIG5ldyBJbmRleFJvdXRlKCkuaW5kZXgocmVxLCByZXMsIG5leHQpO1xyXG4gICAgICAgICB9KTtcclxuICAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgICpcclxuICAgICAgKiBAY2xhc3MgSW5kZXhSb3V0ZVxyXG4gICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAqL1xyXG4gICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaGUgaG9tZSBwYWdlIHJvdXRlLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAY2xhc3MgSW5kZXhSb3V0ZVxyXG4gICAgICAgKiBAbWV0aG9kIGluZGV4XHJcbiAgICAgICAqIEBwYXJhbSByZXEge1JlcXVlc3R9IFRoZSBFeHByZXNzIFJlcXVlc3Qgb2JqZWN0LlxyXG4gICAgICAgKiBAcGFyYW0gcmVzIHtSZXNwb25zZX0gVGhlIEV4cHJlc3MgUmVzcG9uc2Ugb2JqZWN0LlxyXG4gICAgICAgKiBAcGFyYW0gbmV4dCB7TmV4dEZ1bmN0aW9ufSBFeGVjdXRlIHRoZSBuZXh0IG1ldGhvZC5cclxuICAgICAgICovXHJcbiAgICAgICBwdWJsaWMgaW5kZXgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICAgICAvLyBzZXQgY3VzdG9tIHRpdGxlXHJcbiAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiTXVzaXFRIEhvbWVcIjtcclxuXHJcbiAgICAgICAgICAgLy9zZXQgb3B0aW9uc1xyXG4gICAgICAgICAgIGxldCBvcHRpb25zOiBPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIldlbGNvbWUgdG8gTXVzaWNRLiBZb3VyIHBhcnR5IGZyaWVuZC5cIlxyXG4gICAgICAgICAgIH07XHJcbiAgICAgICAgICAgLy8gcmVuZGVyIHRlbXBsYXRlXHJcbiAgICAgICAgICAgcmVzLnNlbmRmaWxlKFwiLi9kaXN0L3d3dy9kaXN0L2luZGV4Lmh0bWxcIik7XHJcbiAgICAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIuLiJ9
