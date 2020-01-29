import { Request, Response, Router } from "express";
import { IBaseRoute } from "./IBaseRoute";
/**
 * Constructor
 *
 * @class BaseRoute
 */
export declare class BaseRoute implements IBaseRoute {
    protected title: string;
    protected path: string;
    protected router: Router;
    private scripts;
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor(router: Router);
    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The scr to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    addScript(src: string): BaseRoute;
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
    render(req: Request, res: Response, view: string, options?: Object): void;
}
