import { NextFunction, Request, Response } from "express";
export interface IStreamTubeRoute {
    streamAudio(req: Request, res: Response, next: NextFunction): void;
}
