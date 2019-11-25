"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Constructor
 * @class BaseRoute
 */
var BaseRoute = /** @class */ (function () {
    /**
     * Constructor
     * @class BaseRoute
     * @constructor
     */
    function BaseRoute() {
        this.title = "Doba's MusicQ proj";
        this.scripts = [];
    }
    /**
     * Add a JS external file to the request.
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cy9yb3V0ZXMvQmFzZVJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7OztHQUdHO0FBQ0g7SUFNSTs7OztPQUlHO0lBQ0g7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCw2QkFBUyxHQUFULFVBQVUsR0FBVztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCwwQkFBTSxHQUFOLFVBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFZLEVBQUUsT0FBZ0I7UUFDOUQsZUFBZTtRQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUUxQixhQUFhO1FBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVsQyxXQUFXO1FBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUU5QixhQUFhO1FBQ2IsNkJBQTZCO1FBRTdCLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIsaUJBQWlCO1FBQ2pCLE1BQU07SUFDVixDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQXpEQSxBQXlEQyxJQUFBO0FBekRZLDhCQUFTIiwiZmlsZSI6InJvdXRlcy9CYXNlUm91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gXCJleHByZXNzXCI7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0b3JcclxuICogQGNsYXNzIEJhc2VSb3V0ZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhc2VSb3V0ZSB7XHJcblxyXG4gICAgcHJvdGVjdGVkIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBzY3JpcHRzOiBzdHJpbmdbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKiBAY2xhc3MgQmFzZVJvdXRlXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IFwiRG9iYSdzIE11c2ljUSBwcm9qXCI7XHJcbiAgICAgICAgdGhpcy5zY3JpcHRzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBKUyBleHRlcm5hbCBmaWxlIHRvIHRoZSByZXF1ZXN0LlxyXG4gICAgICogQGNsYXNzIEJhc2VSb3V0ZVxyXG4gICAgICogQG1ldGhvZCBhZGRTY3JpcHRcclxuICAgICAqIEBwYXJhbSBzcmMge3N0cmluZ30gVGhlIHNjciB0byB0aGUgZXh0ZXJuYWwgSlMgZmlsZS5cclxuICAgICAqIEByZXR1cm4ge0Jhc2VSb3V0ZX0gU2VsZiBmb3IgY2hhaW5pbmdcclxuICAgICAqL1xyXG4gICAgYWRkU2NyaXB0KHNyYzogc3RyaW5nKTogQmFzZVJvdXRlIHtcclxuICAgICAgICB0aGlzLnNjcmlwdHMucHVzaChzcmMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGEgcGFnZS5cclxuICAgICAqIEBjbGFzcyBCYXNlUm91dGVcclxuICAgICAqIEBtZXRob2QgcmVuZGVyXHJcbiAgICAgKiBAcGFyYW0gcmVxIHtSZXF1ZXN0fSBUaGUgcmVxdWVzdCBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gcmVzIHtSZXNwb25zZX0gVGhlIHJlc3BvbnNlIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB2aWV3IHtTdHJpbmd9IFRoZSB2aWV3IHRvIHJlbmRlci5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9IEFkZGl0aW9uYWwgb3B0aW9ucyB0byBhcHBlbmQgdG8gdGhlIHZpZXdzIGxvY2FsIHNjb3BlLlxyXG4gICAgICogQHJldHVybiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIHZpZXc6IHN0cmluZywgb3B0aW9ucz86IE9iamVjdCkge1xyXG4gICAgICAgIC8vYWRkIGNvbnN0YW50c1xyXG4gICAgICAgIHJlcy5sb2NhbHMuQkFTRV9VUkwgPSBcIi9cIjtcclxuXHJcbiAgICAgICAgLy9hZGQgc2NyaXB0c1xyXG4gICAgICAgIHJlcy5sb2NhbHMuc2NyaXB0cyA9IHRoaXMuc2NyaXB0cztcclxuXHJcbiAgICAgICAgLy9hZGQgdGl0bGVcclxuICAgICAgICByZXMubG9jYWxzLnRpdGxlID0gdGhpcy50aXRsZTtcclxuXHJcbiAgICAgICAgLy9yZW5kZXIgdmlld1xyXG4gICAgICAgIC8vIHJlcy5yZW5kZXIodmlldywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAvLyAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UsXHJcbiAgICAgICAgLy8gICAgIGVycm9yOiBlcnJcclxuICAgICAgICAvLyB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXHNyYyJ9
