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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoute_1 = require("../BaseRoute/BaseRoute");
const puppeteer_1 = __importDefault(require("puppeteer"));
const tsyringe_1 = require("tsyringe");
/**
 * "/search-youtube/?query" route
 *
 * @class SearchTubeRoute
 */
let SearchTubeRoute = class SearchTubeRoute extends BaseRoute_1.BaseRoute {
    /**
      * Constructor
      *
      * @class SearchTubeRoute
      * @constructor
      */
    // tslint:disable-next-line:typedef 
    constructor(router) {
        super(router);
        this.path = "/search-youtube/";
        this.router.get(this.path, () => this.index);
        puppeteer_1.default.launch().then((br) => {
            this.browser = br;
        });
    }
    /**
     * The home page route.
     *
     * @class SearchTubeRoute
     * @method index
     * @param req {Request} The Express Request object.
     * @param res {Response} The Express Response object.
     * @param next {NextFunction} Execute the next method.
     */
    index(req, res, next) {
        // set custom title
        console.log(this);
        this.title = "MusiqQ Home";
        //set options
        //    console.log(req.query.q);
        this.search(req.query.q, res);
    }
    search(q, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.browser.newPage();
            let json;
            page.on("response", (res) => __awaiter(this, void 0, void 0, function* () {
                json = yield res.json();
                response.send(json);
            }));
            page.on("error", (er) => {
                console.log(er);
            });
            page.on("close", (e) => {
                response.send({
                    serverEvent: JSON.stringify(e),
                    msg: "search page was closed"
                });
            });
            yield page.goto("https://youtube.com");
            yield page.type("#search", q);
            yield page.click("button#search-icon-legacy");
            yield page.close;
        });
    }
};
SearchTubeRoute = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject("Router")),
    __metadata("design:paramtypes", [Function])
], SearchTubeRoute);
exports.SearchTubeRoute = SearchTubeRoute;

//# sourceMappingURL=../../source_maps/routes/SearchTubeRoute/SearchTubeRoute.js.map
