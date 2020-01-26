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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BaseRoute_1 = require("./BaseRoute");
var puppeteer = require("puppeteer");
var tsyringe_1 = require("tsyringe");
/**
 * "/search-youtube/?query" route
 *
 * @class SearchTubeRoute
 */
var SearchTubeRoute = /** @class */ (function (_super) {
    __extends(SearchTubeRoute, _super);
    /**
      * Constructor
      *
      * @class SearchTubeRoute
      * @constructor
      */
    // tslint:disable-next-line:typedef
    function SearchTubeRoute(router) {
        var _this = _super.call(this, router) || this;
        _this.path = "/search-youtube/";
        _this.router.get(_this.path.toString(), function (req, res, next) {
            _this.index(req, res, next);
        });
        puppeteer.launch().then(function (br) {
            _this.browser = br;
        });
        return _this;
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
    SearchTubeRoute.prototype.index = function (req, res, next) {
        // set custom title
        this.title = "MusiqQ Home";
        //set options
        //    console.log(req.query.q);
        this.search(req.query.q, res);
    };
    SearchTubeRoute.prototype.search = function (q, response) {
        return __awaiter(this, void 0, void 0, function () {
            var page, json;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.browser.newPage()];
                    case 1:
                        page = _a.sent();
                        page.on("response", function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, res.json()];
                                    case 1:
                                        json = _a.sent();
                                        response.send(json);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        page.on("error", function (er) {
                            console.log(er);
                        });
                        page.on("close", function (e) {
                            response.send({
                                serverEvent: JSON.stringify(e),
                                msg: "search page was closed"
                            });
                        });
                        return [4 /*yield*/, page.goto("https://youtube.com")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.type("#search", q)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.click("button#search-icon-legacy")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.close];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchTubeRoute = __decorate([
        tsyringe_1.autoInjectable(),
        __metadata("design:paramtypes", [Function])
    ], SearchTubeRoute);
    return SearchTubeRoute;
}(BaseRoute_1.BaseRoute));
exports.SearchTubeRoute = SearchTubeRoute;

//# sourceMappingURL=../source_maps/routes/SearchTubeRoute.js.map
