import { NextFunction, Request, Response, Router } from "express-serve-static-core";
import {BaseRoute} from "../BaseRoute/BaseRoute";
import puppeteer from "puppeteer";
import { injectable, inject } from "tsyringe";
import {ISearchTubeRoute} from "./ISearchTubeRoute";
import cheerio from "cheerio";

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

       public async search(q: string, response: Response) {
		   try {
				const page = await this.browser.newPage();
				let json;
				page.on("error", (er: Error) => {
					console.log(er);
				});
				await page.setExtraHTTPHeaders({Referer: "https://youtube.com"}); 
				await page.goto("https://youtube.com");
				await page.waitForSelector('input[id="search"]', { timeout: 5000 });
				const input = await page.$('input[id="search"]');
				// overwrites last text in input
				await input.click({ clickCount: 3 });
				await input.type(q);
				await input.focus();
				await page.keyboard.press("Enter");
				await page.waitForFunction(`document.title.indexOf('${q}') !== -1`, { timeout: 5000 });
				await page.waitForSelector('ytd-video-renderer,ytd-grid-video-renderer', { timeout: 5000 });
				await this.sleep(1);
				
				json = await page.content();
				json = this.parse(json);
				response.json(json);

				await page.close;
			} catch (e){
				console.log(e);
				console.log("Losho Sedlarov Losho");
			}
		}
		
		private parse(html: any) {
			// load the page source into cheerio
			const $ = cheerio.load(html);
		
			// perform queries
			const results: any[] = [];
			$('#contents ytd-video-renderer,#contents ytd-grid-video-renderer').each((i, link) => {
				results.push({
					link: $(link).find('#video-title').attr('href'),
					title: $(link).find('#video-title').text(),
					snippet: $(link).find('#description-text').text(),
					channel: $(link).find('#byline a').text(),
					channel_link: $(link).find('#byline a').attr('href'),
					num_views: $(link).find('#metadata-line span:nth-child(1)').text(),
					release_date: $(link).find('#metadata-line span:nth-child(2)').text(),
				})
			});
		
			const cleaned = [];
			for (var i=0; i < results.length; i++) {
				let res = results[i];
				if (res.link && res.link.trim() && res.title && res.title.trim()) {
					res.title = res.title.trim();
					res.snippet = res.snippet.trim();
					res.rank = i+1;
		
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
			}
		}
}