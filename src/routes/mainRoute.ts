import express, { Request, Response } from "express";

export const mainRouter = express.Router();

mainRouter.get('/', (_: Request, res: Response) => {
    res.json({
        project: 'wasp-identification',
        accountable: {
            name: "William Wallace",
            contact: "williamwtr@outlook.com"
        },
        devs: [
        {
            name: "William Wallace",
            contact: "williamwtr@outlook.com"
        }
        ]
    })
})