import { NextFunction, Request, Response } from "express";
export interface IIndexRoute {
    index(req: Request, res: Response, next: NextFunction): void;
}
