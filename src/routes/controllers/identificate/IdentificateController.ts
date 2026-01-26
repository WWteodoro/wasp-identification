import { Request, Response } from "express";
import { IIdentificationRepository } from "../../../interfaces/IIdentificationRepository";
import { IdentificateService } from "../../../services/IdentificateService";

export class IdentificateController {
    constructor(private repo: IIdentificationRepository) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }

        const identificateService = new IdentificateService(this.repo);

        try {
            const result = await identificateService.execute(file);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao processar imagem na IA" });
        }
    }
}