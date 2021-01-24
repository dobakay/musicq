import { NextFunction, Request, Response } from "express";
export interface IStreamTubeRoute {
    // download(req: Request, res: Response, next: NextFunction): void;
    // downloadAudioToRoot(req: Request, res: Response, next: NextFunction): void;
    streamAudio(req: Request, res: Response, next: NextFunction): void;
}