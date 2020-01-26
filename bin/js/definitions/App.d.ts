import * as express from "express";
import "reflect-metadata";
import "reflect-metadata";
export declare class Server {
    private servicesDepencyTree;
    app: express.Application;
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    static bootstrap(): Server;
    /**
    * Constructor
    *
    * @class Server
    * @constructor
    */
    constructor();
    /**
     * Resolve Service dependencies
     *
     * @class Server
     * @method resolveServiceDependencies
     */
    resolveServiceDependencies(): void;
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    api(): void;
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    config(): void;
    /**
   * Create routes
   *
   * @class Server
   * @method routes
   * @return void
   */
    routes(): void;
}
