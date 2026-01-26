import { Request, Response, Router } from "express";
import multer from "multer"; 
import { IdentificationRepository } from "../repositories/IdentificationRepository";
import { IdentificateController } from "./controllers/identificate/IdentificateController";
import { resolveController } from "../adapters/resolverController";

export const identificateRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const repo = new IdentificationRepository();
const identificate = new IdentificateController(repo);

identificateRoute.post('/', upload.single('file'), resolveController(async (req: Request, res: Response) => {
    return await identificate.handle(req, res);
}));