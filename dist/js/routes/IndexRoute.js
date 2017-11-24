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
        res.sendfile("./dist/www/dist/index.html");
    };
    return IndexRoute;
}(BaseRoute_1.BaseRoute));
exports.IndexRoute = IndexRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9yb3V0ZXMvSW5kZXhSb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBc0M7QUFFdEM7Ozs7R0FJRztBQUNIO0lBQWdDLDhCQUFTO0lBaUJwQzs7Ozs7T0FLRztJQUNGO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBeEJIOzs7Ozs7O09BT0c7SUFDWSxpQkFBTSxHQUFwQixVQUFxQixNQUFjO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUUxRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDNUQsSUFBSSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFZQTs7Ozs7Ozs7T0FRRztJQUNLLDBCQUFLLEdBQVosVUFBYSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ3hELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUUzQixhQUFhO1FBQ2IsSUFBSSxPQUFPLEdBQVc7WUFDbEIsU0FBUyxFQUFFLHVDQUF1QztTQUNyRCxDQUFDO1FBQ0YsR0FBRyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFUixpQkFBQztBQUFELENBL0NBLEFBK0NDLENBL0MrQixxQkFBUyxHQStDeEM7QUEvQ1ksZ0NBQVUiLCJmaWxlIjoicm91dGVzL0luZGV4Um91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UsIFJvdXRlcn0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtCYXNlUm91dGV9IGZyb20gXCIuL0Jhc2VSb3V0ZVwiO1xyXG5cclxuLyoqXHJcbiAqIFwiL1wiIHJvdXRlXHJcbiAqXHJcbiAqIEBjbGFzcyBJbmRleFJvdXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW5kZXhSb3V0ZSBleHRlbmRzIEJhc2VSb3V0ZSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0aGUgcm91dGVzLlxyXG4gICAgICpcclxuICAgICAqIEBjbGFzcyBJbmRleFJvdXRlXHJcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxyXG4gICAgICogQHBhcmFtIHJvdXRlciB7Um91dGVyfSBUaGUgRXhwcmVzcyBSb3V0ZXIuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShyb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIltJbmRleFJvdXRlOjpjcmVhdGVdIENyZWF0aW5nIGluZGV4IHJvdXRlLlwiKTtcclxuXHJcbiAgICAgICAgIHJvdXRlci5nZXQoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgbmV3IEluZGV4Um91dGUoKS5pbmRleChyZXEsIHJlcywgbmV4dCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgICogQ29uc3RydWN0b3JcclxuICAgICAgKlxyXG4gICAgICAqIEBjbGFzcyBJbmRleFJvdXRlXHJcbiAgICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgICovXHJcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIFRoZSBob21lIHBhZ2Ugcm91dGUuXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBjbGFzcyBJbmRleFJvdXRlXHJcbiAgICAgICAqIEBtZXRob2QgaW5kZXhcclxuICAgICAgICogQHBhcmFtIHJlcSB7UmVxdWVzdH0gVGhlIEV4cHJlc3MgUmVxdWVzdCBvYmplY3QuXHJcbiAgICAgICAqIEBwYXJhbSByZXMge1Jlc3BvbnNlfSBUaGUgRXhwcmVzcyBSZXNwb25zZSBvYmplY3QuXHJcbiAgICAgICAqIEBwYXJhbSBuZXh0IHtOZXh0RnVuY3Rpb259IEV4ZWN1dGUgdGhlIG5leHQgbWV0aG9kLlxyXG4gICAgICAgKi9cclxuICAgICAgIHB1YmxpYyBpbmRleChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgICAgICAgIC8vIHNldCBjdXN0b20gdGl0bGVcclxuICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJNdXNpcVEgSG9tZVwiO1xyXG5cclxuICAgICAgICAgICAvL3NldCBvcHRpb25zXHJcbiAgICAgICAgICAgbGV0IG9wdGlvbnM6IE9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiV2VsY29tZSB0byBNdXNpY1EuIFlvdXIgcGFydHkgZnJpZW5kLlwiXHJcbiAgICAgICAgICAgfTtcclxuICAgICAgICAgICByZXMuc2VuZGZpbGUoXCIuL2Rpc3Qvd3d3L2Rpc3QvaW5kZXguaHRtbFwiKTtcclxuICAgICAgIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii4uIn0=
