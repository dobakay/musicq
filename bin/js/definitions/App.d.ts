import { Express } from "express-serve-static-core";
import "reflect-metadata";
import "reflect-metadata";
export declare class Server {
    private servicesDepencyTree;
    app: Express;
    private logger;
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
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
