"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Constructor
 *
 * @class BaseRoute
 */
var BaseRoute = /** @class */ (function () {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    function BaseRoute() {
        this.title = "Doba's MusicQ proj";
        this.scripts = [];
    }
    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The scr to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    BaseRoute.prototype.addScript = function (src) {
        this.scripts.push(src);
        return this;
    };
    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the views local scope.
     * @return void
     */
    BaseRoute.prototype.render = function (req, res, view, options) {
        //add constants
        res.locals.BASE_URL = "/";
        //add scripts
        res.locals.scripts = this.scripts;
        //add title
        res.locals.title = this.title;
        //render view
        // res.render(view, options);
        // res.status(500).json({
        //     message: err.message,
        //     error: err
        // });
    };
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9yb3V0ZXMvQmFzZVJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7R0FJRztBQUNIO0lBTUk7Ozs7O09BS0c7SUFDSDtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCw2QkFBUyxHQUFULFVBQVUsR0FBVztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsMEJBQU0sR0FBTixVQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBWSxFQUFFLE9BQWdCO1FBQzlELGVBQWU7UUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFFMUIsYUFBYTtRQUNiLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFbEMsV0FBVztRQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFOUIsYUFBYTtRQUNiLDZCQUE2QjtRQUU3Qix5QkFBeUI7UUFDekIsNEJBQTRCO1FBQzVCLGlCQUFpQjtRQUNqQixNQUFNO0lBQ1YsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0E1REEsQUE0REMsSUFBQTtBQTVEWSw4QkFBUyIsImZpbGUiOiJyb3V0ZXMvQmFzZVJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdG9yXHJcbiAqIFxyXG4gKiBAY2xhc3MgQmFzZVJvdXRlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmFzZVJvdXRlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIHNjcmlwdHM6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIFxyXG4gICAgICogQGNsYXNzIEJhc2VSb3V0ZVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBcIkRvYmEncyBNdXNpY1EgcHJvalwiO1xyXG4gICAgICAgIHRoaXMuc2NyaXB0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgSlMgZXh0ZXJuYWwgZmlsZSB0byB0aGUgcmVxdWVzdC5cclxuICAgICAqIFxyXG4gICAgICogQGNsYXNzIEJhc2VSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBhZGRTY3JpcHRcclxuICAgICAqIEBwYXJhbSBzcmMge3N0cmluZ30gVGhlIHNjciB0byB0aGUgZXh0ZXJuYWwgSlMgZmlsZS5cclxuICAgICAqIEByZXR1cm4ge0Jhc2VSb3V0ZX0gU2VsZiBmb3IgY2hhaW5pbmdcclxuICAgICAqL1xyXG4gICAgYWRkU2NyaXB0KHNyYzogc3RyaW5nKTogQmFzZVJvdXRlIHtcclxuICAgICAgICB0aGlzLnNjcmlwdHMucHVzaChzcmMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGEgcGFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAY2xhc3MgQmFzZVJvdXRlXHJcbiAgICAgKiBAbWV0aG9kIHJlbmRlclxyXG4gICAgICogQHBhcmFtIHJlcSB7UmVxdWVzdH0gVGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHJlcyB7UmVzcG9uc2V9IFRoZSByZXNwb25zZSBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gdmlldyB7U3RyaW5nfSBUaGUgdmlldyB0byByZW5kZXIuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fSBBZGRpdGlvbmFsIG9wdGlvbnMgdG8gYXBwZW5kIHRvIHRoZSB2aWV3cyBsb2NhbCBzY29wZS5cclxuICAgICAqIEByZXR1cm4gdm9pZFxyXG4gICAgICovXHJcbiAgICByZW5kZXIocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCB2aWV3OiBzdHJpbmcsIG9wdGlvbnM/OiBPYmplY3QpIHtcclxuICAgICAgICAvL2FkZCBjb25zdGFudHNcclxuICAgICAgICByZXMubG9jYWxzLkJBU0VfVVJMID0gXCIvXCI7XHJcblxyXG4gICAgICAgIC8vYWRkIHNjcmlwdHNcclxuICAgICAgICByZXMubG9jYWxzLnNjcmlwdHMgPSB0aGlzLnNjcmlwdHM7XHJcblxyXG4gICAgICAgIC8vYWRkIHRpdGxlXHJcbiAgICAgICAgcmVzLmxvY2Fscy50aXRsZSA9IHRoaXMudGl0bGU7XHJcblxyXG4gICAgICAgIC8vcmVuZGVyIHZpZXdcclxuICAgICAgICAvLyByZXMucmVuZGVyKHZpZXcsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgLy8gICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgIC8vICAgICBlcnJvcjogZXJyXHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXHNyYyJ9
