import { NextFunction, Request, Response } from "express";
export interface ISearchTubeRoute {
    index(req: Request, res: Response, next: NextFunction): void;
    search(query: string, response: Response, regionCode: string, relevanceLanguage: string, v: Boolean): void;
}
