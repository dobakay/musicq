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
        this.render(req, res, "index", options);
    };
    return IndexRoute;
}(BaseRoute_1.BaseRoute));
exports.IndexRoute = IndexRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvSW5kZXhSb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBc0M7QUFFdEM7Ozs7R0FJRztBQUNIO0lBQWdDLDhCQUFTO0lBaUJwQzs7Ozs7T0FLRztJQUNGO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBeEJIOzs7Ozs7O09BT0c7SUFDWSxpQkFBTSxHQUFwQixVQUFxQixNQUFjO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUUxRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDNUQsSUFBSSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZQTs7Ozs7Ozs7T0FRRztJQUNLLDBCQUFLLEdBQVosVUFBYSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ3hELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUUzQixhQUFhO1FBQ2IsSUFBSSxPQUFPLEdBQVc7WUFDbEIsU0FBUyxFQUFFLHVDQUF1QztTQUNyRCxDQUFDO1FBRUYsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVSLGlCQUFDO0FBQUQsQ0FqREEsQUFpREMsQ0FqRCtCLHFCQUFTLEdBaUR4QztBQWpEWSxnQ0FBVSIsImZpbGUiOiJyb3V0ZXMvSW5kZXhSb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQge0Jhc2VSb3V0ZX0gZnJvbSBcIi4vQmFzZVJvdXRlXCI7XHJcblxyXG4vKipcclxuICogXCIvXCIgcm91dGVcclxuICpcclxuICogQGNsYXNzIEluZGV4Um91dGVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbmRleFJvdXRlIGV4dGVuZHMgQmFzZVJvdXRlIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRoZSByb3V0ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIEluZGV4Um91dGVcclxuICAgICAqIEBtZXRob2QgY3JlYXRlXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyIHtSb3V0ZXJ9IFRoZSBFeHByZXNzIFJvdXRlci5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiW0luZGV4Um91dGU6OmNyZWF0ZV0gQ3JlYXRpbmcgaW5kZXggcm91dGUuXCIpO1xyXG5cclxuICAgICAgICAgcm91dGVyLmdldChcIi9cIiwgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICBuZXcgSW5kZXhSb3V0ZSgpLmluZGV4KHJlcSwgcmVzLCBuZXh0KTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAgKiBDb25zdHJ1Y3RvclxyXG4gICAgICAqXHJcbiAgICAgICogQGNsYXNzIEluZGV4Um91dGVcclxuICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgKi9cclxuICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogVGhlIGhvbWUgcGFnZSByb3V0ZS5cclxuICAgICAgICpcclxuICAgICAgICogQGNsYXNzIEluZGV4Um91dGVcclxuICAgICAgICogQG1ldGhvZCBpbmRleFxyXG4gICAgICAgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgRXhwcmVzcyBSZXF1ZXN0IG9iamVjdC5cclxuICAgICAgICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSBFeHByZXNzIFJlc3BvbnNlIG9iamVjdC5cclxuICAgICAgICogQHBhcmFtIG5leHQge05leHRGdW5jdGlvbn0gRXhlY3V0ZSB0aGUgbmV4dCBtZXRob2QuXHJcbiAgICAgICAqL1xyXG4gICAgICAgcHVibGljIGluZGV4KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgLy8gc2V0IGN1c3RvbSB0aXRsZVxyXG4gICAgICAgICAgIHRoaXMudGl0bGUgPSBcIk11c2lxUSBIb21lXCI7XHJcblxyXG4gICAgICAgICAgIC8vc2V0IG9wdGlvbnNcclxuICAgICAgICAgICBsZXQgb3B0aW9uczogT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJXZWxjb21lIHRvIE11c2ljUS4gWW91ciBwYXJ0eSBmcmllbmQuXCJcclxuICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAvLyByZW5kZXIgdGVtcGxhdGVcclxuICAgICAgICAgICB0aGlzLnJlbmRlcihyZXEsIHJlcyxcImluZGV4XCIsIG9wdGlvbnMpO1xyXG4gICAgICAgfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiLi4ifQ==
