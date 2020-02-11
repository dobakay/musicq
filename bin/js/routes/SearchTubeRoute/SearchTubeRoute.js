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
const cheerio_1 = __importDefault(require("cheerio"));
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
        this.all_videos = new Set();
        this.sleep = (seconds) => new Promise(resolve => setTimeout(resolve, (seconds || 1) * 1000));
        this.path = "/search-youtube/";
        this.router.get(this.path, (req, res, next) => {
            this.index.call(this, req, res, next);
        });
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
        this.title = "MusiqQ Home";
        //set options
        this.search(req.query.q, res);
    }
    search(q, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = yield this.browser.newPage();
                page.on("error", (er) => {
                    console.log(er);
                });
                // await page.setExtraHTTPHeaders({Referer: "https://youtube.com"}); 
                yield page.goto("https://youtube.com");
                yield page.waitForSelector('input[id="search"]', { timeout: 5000 });
                const input = yield page.$('input[id="search"]');
                // overwrites last text in input
                yield input.click({ clickCount: 3 });
                yield input.focus();
                yield input.type(q);
                yield input.focus();
                yield page.keyboard.press("Enter");
                yield page.waitForFunction(`document.title.indexOf('${q}') !== -1`, { timeout: 5000 });
                yield page.waitForSelector('ytd-video-renderer,ytd-grid-video-renderer', { timeout: 5000 });
                yield this.sleep(1);
                let json = yield page.content();
                json = this.parse(json);
                // if(json.results.length === 0)
                // {
                // 	this.search(q, response);
                // }
                response.json(json);
                yield page.close;
            }
            catch (e) {
                console.log(e);
                console.log("Losho Sedlarov Losho");
            }
        });
    }
    parse(html) {
        // load the page source into cheerio
        const $ = cheerio_1.default.load(html);
        // perform queries
        const results = [];
        $('#contents ytd-video-renderer,#contents ytd-grid-video-renderer').each((i, link) => {
            results.push({
                link: $(link).find('#video-title').attr('href'),
                title: $(link).find('#video-title').text(),
                thumbnail: $(link).find('#thumbnail img').attr('src'),
                snippet: $(link).find('#description-text').text(),
                channel: $(link).find('#container.ytd-channel-name a').attr('href'),
                ownerText: $(link).find('#container.ytd-channel-name a').text(),
                channel_link: $(link).find('#byline a').attr('href'),
                num_views: $(link).find('#metadata-line span:nth-child(1)').text(),
                release_date: $(link).find('#metadata-line span:nth-child(2)').text(),
            });
        });
        const cleaned = [];
        for (var i = 0; i < results.length; i++) {
            let res = results[i];
            if (res.link && res.link.trim() && res.title && res.title.trim()) {
                res.title = res.title.trim();
                res.id = res.link.substr((`/watch?v=`).length);
                res.snippet = res.snippet.trim();
                res.rank = i + 1;
                // check if this result has been used before
                if (this.all_videos.has(res.title) === false) {
                    cleaned.push(res);
                }
                this.all_videos.add(res.title);
            }
        }
        return {
            time: (new Date()).toUTCString(),
            results: cleaned,
        };
    }
};
SearchTubeRoute = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject("Router")),
    __metadata("design:paramtypes", [Function])
], SearchTubeRoute);
exports.SearchTubeRoute = SearchTubeRoute;

//# sourceMappingURL=../../source_maps/routes/SearchTubeRoute/SearchTubeRoute.js.map
