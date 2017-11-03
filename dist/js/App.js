"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Server = /** @class */ (function () {
    /**
    * Constructor
    *
    * @class Server
    * @constructor
    */
    function Server() {
        // create expressjs application
        this.app = express();
        // configure application
        this.config();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    return Server;
}());
/// <reference path="_all.d.ts" /> 

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxpQ0FBbUM7QUFHbkM7SUFnQkM7Ozs7O01BS0U7SUFDRjtRQUNDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBRXJCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBeEJEOzs7Ozs7O09BT0c7SUFDVyxnQkFBUyxHQUF2QjtRQUNDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFlRixhQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQTtBQUVELGtDQUFrQyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xyXG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmNsYXNzIFNlcnZlciB7XHJcblxyXG5cdHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAY2xhc3MgU2VydmVyXHJcblx0ICogQG1ldGhvZCBib290c3RyYXBcclxuXHQgKiBAc3RhdGljXHJcblx0ICogQHJldHVybiB7bmcuYXV0by5JSW5qZWN0b3JTZXJ2aWNlfSBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIGluamVjdG9yIGZvciB0aGlzIGFwcC5cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGJvb3RzdHJhcCgpOiBTZXJ2ZXIge1xyXG5cdFx0cmV0dXJuIG5ldyBTZXJ2ZXIoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogQ29uc3RydWN0b3JcclxuXHQqXHJcblx0KiBAY2xhc3MgU2VydmVyXHJcblx0KiBAY29uc3RydWN0b3JcclxuXHQqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly8gY3JlYXRlIGV4cHJlc3NqcyBhcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5hcHAgPSBleHByZXNzKCk7XHJcblxyXG5cdFx0Ly8gY29uZmlndXJlIGFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLmNvbmZpZygpO1xyXG5cdH1cclxufVxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9hbGwuZC50c1wiIC8+Il0sInNvdXJjZVJvb3QiOiIifQ==
