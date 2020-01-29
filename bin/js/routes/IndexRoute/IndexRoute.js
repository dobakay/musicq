"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoute_1 = require("../BaseRoute/BaseRoute");
const tsyringe_1 = require("tsyringe");
/**
 * "/" route
 *
 * @class IndexRoute
 */
let IndexRoute = class IndexRoute extends BaseRoute_1.BaseRoute {
    /**
     * Constructor
     *
     * @class IndexRoute
     */
    constructor(router) {
        super(router);
        this.path = "/";
        this.router.get(this.path, (req, res, next) => {
            this.index(req, res, next);
        });
    }
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    index(req, res, next) {
        // set custom title
        this.title = "MusiqQ Home";
        //set options
        let options = {
            "message": "Welcome to MusicQ. Your party friend."
        };
        res.sendfile("./bin/www/dist/index.html");
    }
};
IndexRoute = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject("Router")),
    __metadata("design:paramtypes", [Function])
], IndexRoute);
exports.IndexRoute = IndexRoute;

//# sourceMappingURL=../../source_maps/routes/IndexRoute/IndexRoute.js.map
