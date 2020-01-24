import {NextFunction, Request, Response} from "express";
import {Router} from "express";
import { injectable } from "tsyringe";

/**
 * Constructor
 *
 * @class BaseRoute
 */
@injectable()
export class BaseRoute {

    protected title: string;
    protected path: string;
    protected router: Router;

    private scripts: string[];

    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor(path: string, router: Router) {
        this.title = "Doba's MusicQ proj";
        this.scripts = [];
        this.path = path;
        this.router = router;
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The scr to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }

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
    render(req: Request, res: Response, view: string, options?: Object) {
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
    }

}