import { NextFunction, Request, Response } from "express";
export interface ISearchTubeRoute {
    index(req: Request, res: Response, next: NextFunction): void;
    search(q: string, response: Response): void;
}
