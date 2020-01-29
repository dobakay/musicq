import { Request, Response } from "express";
export interface IBaseRoute {
    addScript(src: string): IBaseRoute;
    render(req: Request, res: Response, view: string, options?: Object): void;
}
