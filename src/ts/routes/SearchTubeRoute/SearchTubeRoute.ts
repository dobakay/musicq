import { NextFunction, Request, Response, Router } from "express-serve-static-core";
import {BaseRoute} from "../BaseRoute/BaseRoute";
import puppeteer from "puppeteer";
import { injectable, inject } from "tsyringe";
import {ISearchTubeRoute} from "./ISearchTubeRoute";
import cheerio from "cheerio";
import * as _ from "lodash";
import request from "request-promise";
import requestPromise from "request-promise";


// API keys
const _GOOGLE = 'AIzaSyBCshUQSpLKuhmfE5Jc-LEm6vH-sab5Vl8';

/**
 * "/search-youtube/?query" route
 *
 * @class SearchTubeRoute
 */
@injectable()
export class SearchTubeRoute extends BaseRoute implements ISearchTubeRoute {
    browser: any;
	path: string;
	all_videos = new Set();
    /**
      * Constructor
      *
      * @class SearchTubeRoute
      * @constructor
      */
    // tslint:disable-next-line:typedef 
    constructor(@inject("Router") router: Router) { 
        super(router);
		this.path = "/search-youtube/";
        this.router.get(this.path, (req, res, next) => {
			this.index.call(this, req, res, next);
		});

        puppeteer.launch().then((br) => {
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
       public index(req: Request, res: Response, next: NextFunction) {
			// set custom title
			this.title = "MusiqQ Home";

           	//set options
           	this.search(req.query.q, res);
	   }
	   
	   private sleep = (seconds: any) =>
		   new Promise(resolve => setTimeout(resolve, (seconds || 1) * 1000));
		   
		/**
		 * Search a query on YouTube and return the detailed results
		 * @param query string
		 * @param regionCode string ISO 3166-1 alpha-2 country code (ex: FR, US)
		 * @param relevanceLanguage string ISO 639-1 two-letter language code (ex: en: fr)
		 * @param v boolean Verbosity
		 * @return Promise
		 */
		public search(query: string, response: Response, regionCode?: string, relevanceLanguage?: string , v?: Boolean) : any {
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
			const improveTitle = (title: string) => {
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
			const parseTime = (time: any) => {
			  time = time.replace('PT', '');
			  time = time.replace('S', '');
			  if (/M/.test(time)) {
				time = time.split('M');
				return parseInt(time[0]) * 60 + (parseInt(time[1]) || 0);
			  } else {
				return parseInt(time[0]);
			  }
			};
		  
			const results:any[] = [];
		  
			// We simply search on YouTube
			let localePart;
			if (regionCode) {
			  localePart = '&regionCode=' + regionCode;
			} else if (relevanceLanguage) {
			  localePart = '&relevanceLanguage=' + relevanceLanguage;
			}
			return request({
			  url:
				'https://www.googleapis.com/youtube/v3/search?part=snippet&key=' +
				_GOOGLE +
				localePart +
				'&maxResults=15&q=' +
				encodeURIComponent(query),
			  json: true,
			})
			  .then((body: any) => {
				if (!body.items || body.items.length === 0) {
				  return Promise.reject();
				}
		  
				const requests:any[] = [];
		  
				_.forEach(body.items, (s) => {
				  if (!s.id.videoId) {
					return;
				  }
		  
				  let req = request({
					url:
					  'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key=' +
					  _GOOGLE +
					  '&id=' +
					  s.id.videoId,
					json: true,
				  }).then((video: any) => {
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
		  };


    //    public async search(q: string, response: Response) {
		//    try {
		// 		const page = await this.browser.newPage();
		// 		page.on("error", (er: Error) => {
		// 			console.log(er);
		// 		});
		// 		// await page.setExtraHTTPHeaders({Referer: "https://youtube.com"}); 
		// 		await page.goto("https://youtube.com");
		// 		await page.waitForSelector('input[id="search"]', { timeout: 5000 });
		// 		const input = await page.$('input[id="search"]');
		// 		// overwrites last text in input
		// 		await input.click({ clickCount: 3 });
		// 		await input.focus();
		// 		await input.type(q);
		// 		await input.focus();
		// 		await page.keyboard.press("Enter");
		// 		await page.waitForFunction(`document.title.indexOf('${q}') !== -1`, { timeout: 5000 });
		// 		await page.waitForSelector('ytd-video-renderer,ytd-grid-video-renderer', { timeout: 5000 });
		// 		await this.sleep(1);
				
		// 		let json = await page.content();
		// 		json = this.parse(json);
		// 		// if(json.results.length === 0)
		// 		// {
		// 		// 	this.search(q, response);
		// 		// }
		// 		response.json(json);

		// 		await page.close;
		// 	} catch (e){
		// 		console.log(e);
		// 		console.log("Losho Sedlarov Losho");
		// 	}

		// }
		
		// private parse(html: any) {
		// 	// load the page source into cheerio
		// 	const $ = cheerio.load(html);
		
		// 	// perform queries
		// 	const results: any[] = [];
		// 	$('#contents ytd-video-renderer,#contents ytd-grid-video-renderer').each((i, link) => {
		// 		results.push({
		// 			link: $(link).find('#video-title').attr('href'),
		// 			title: $(link).find('#video-title').text(),
		// 			thumbnail: $(link).find('#thumbnail img').attr('src'),
		// 			snippet: $(link).find('#description-text').text(),
		// 			channel: $(link).find('#container.ytd-channel-name a').attr('href'),
		// 			ownerText: $(link).find('#container.ytd-channel-name a').text(),
		// 			channel_link: $(link).find('#byline a').attr('href'),
		// 			num_views: $(link).find('#metadata-line span:nth-child(1)').text(),
		// 			release_date: $(link).find('#metadata-line span:nth-child(2)').text(),
		// 		})
		// 	});
		
		// 	const cleaned = [];
		// 	for (var i=0; i < results.length; i++) {
		// 		let res = results[i];
		// 		if (res.link && res.link.trim() && res.title && res.title.trim()) {
		// 			res.title = res.title.trim();
		// 			res.id = res.link.substr((`/watch?v=`).length);
		// 			res.snippet = res.snippet.trim();
		// 			res.rank = i+1;
		
		// 			// check if this result has been used before
		// 			if (this.all_videos.has(res.title) === false) {
		// 				cleaned.push(res);
		// 			}
		// 			this.all_videos.add(res.title);
		// 		}
		// 	}
		
		// 	return {
		// 		time: (new Date()).toUTCString(),
		// 		results: cleaned,
		// 	}
		// }
}