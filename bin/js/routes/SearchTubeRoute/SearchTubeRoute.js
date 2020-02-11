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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoute_1 = require("../BaseRoute/BaseRoute");
const puppeteer_1 = __importDefault(require("puppeteer"));
const tsyringe_1 = require("tsyringe");
const _ = __importStar(require("lodash"));
const request_promise_1 = __importDefault(require("request-promise"));
// API keys
const _GOOGLE = 'AIzaSyBCshUQSpLKuhmfE5Jc-LEm6vH-sab5Vl8';
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
    /**
     * Search a query on YouTube and return the detailed results
     * @param query string
     * @param regionCode string ISO 3166-1 alpha-2 country code (ex: FR, US)
     * @param relevanceLanguage string ISO 639-1 two-letter language code (ex: en: fr)
     * @param v boolean Verbosity
     * @return Promise
     */
    search(query, response, regionCode, relevanceLanguage, v) {
        if (v === undefined) {
            v = false;
        }
        if (regionCode === undefined && relevanceLanguage === undefined) {
            regionCode = 'US';
        }
        /**
         * Remove useless information in the title
         * like (audio only), (lyrics)...
         * @param title string
         * @return string
         */
        const improveTitle = (title) => {
            let useless = [
                'audio only',
                'audio',
                'paroles/lyrics',
                'lyrics/paroles',
                'with lyrics',
                'w/lyrics',
                'w / lyrics',
                'avec paroles',
                'avec les paroles',
                'avec parole',
                'lyrics',
                'paroles',
                'parole',
                'radio edit.',
                'radio edit',
                'radio-edit',
                'shazam version',
                'shazam v...',
                'music video',
                'clip officiel',
                'officiel',
                'new song',
                'official video',
                'official',
            ];
            _.forEach(useless, (u) => {
                title = title.replace(new RegExp('((\\(|\\[)?)( ?)' + u + '( ?)((\\)|\\])?)', 'gi'), '');
            });
            title = title.replace(new RegExp('(\\(|\\[)( ?)hd( ?)(\\)|\\])', 'gi'), '');
            title = title.replace(new RegExp('hd', 'gi'), '');
            title = _.trim(title);
            return title;
        };
        /**
         * Returns an ISO 8601 Time as PT3M6S (=3min and 6seconds)
         * in seconds
         */
        const parseTime = (time) => {
            time = time.replace('PT', '');
            time = time.replace('S', '');
            if (/M/.test(time)) {
                time = time.split('M');
                return parseInt(time[0]) * 60 + (parseInt(time[1]) || 0);
            }
            else {
                return parseInt(time[0]);
            }
        };
        const results = [];
        // We simply search on YouTube
        let localePart;
        if (regionCode) {
            localePart = '&regionCode=' + regionCode;
        }
        else if (relevanceLanguage) {
            localePart = '&relevanceLanguage=' + relevanceLanguage;
        }
        return request_promise_1.default({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=' +
                _GOOGLE +
                localePart +
                '&maxResults=15&q=' +
                encodeURIComponent(query),
            json: true,
        })
            .then((body) => {
            if (!body.items || body.items.length === 0) {
                return Promise.reject();
            }
            const requests = [];
            _.forEach(body.items, (s) => {
                if (!s.id.videoId) {
                    return;
                }
                let req = request_promise_1.default({
                    url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key=' +
                        _GOOGLE +
                        '&id=' +
                        s.id.videoId,
                    json: true,
                }).then((video) => {
                    video = video.items[0];
                    console.log(video);
                    let ratio = 1.0;
                    if (!video.statistics) {
                        return;
                    }
                    if (video.statistics.dislikeCount > 0) {
                        ratio = video.statistics.likeCount / video.statistics.dislikeCount;
                    }
                    if (ratio === 0) {
                        ratio = 1;
                    }
                    let realLike = (video.statistics.likeCount - video.statistics.dislikeCount) * ratio;
                    results.push({
                        id: video.id,
                        url: 'https://www.youtube.com/watch?v=' + video.id,
                        title: improveTitle(video.snippet.title),
                        thumbnail: video.snippet.thumbnails.high,
                        hd: video.contentDetails.definition === 'hd',
                        duration: parseTime(video.contentDetails.duration),
                        views: parseInt(video.statistics.viewCount),
                        realLike: realLike,
                    });
                });
                requests.push(req);
            });
            return Promise.all(requests);
        })
            .then(() => response.send(results), (e) => console.log);
    }
    ;
};
SearchTubeRoute = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject("Router")),
    __metadata("design:paramtypes", [Function])
], SearchTubeRoute);
exports.SearchTubeRoute = SearchTubeRoute;

//# sourceMappingURL=../../source_maps/routes/SearchTubeRoute/SearchTubeRoute.js.map
