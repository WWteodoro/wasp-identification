import axios from 'axios';
import FormData from 'form-data';
import { IIdentificationRepository } from "../interfaces/IIdentificationRepository";

export class IdentificateService {
    constructor(private repo: IIdentificationRepository) {}

    async execute(file: Express.Multer.File): Promise<any> {
        console.log("=== DEBUG SERVICE ===");
        console.log("1. Arquivo chegou?", !!file);
        console.log("2. Nome original:", file?.originalname);
        console.log("3. Tem buffer?", !!file?.buffer);
        console.log("4. Tamanho do buffer:", file?.buffer?.length);
        
        if (!file || !file.buffer) {
            throw new Error("ERRO CRÍTICO: O arquivo ou o buffer estão vazios no Service!");
        }

        try {
            const form = new FormData();

            form.append('imagem', file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype
            });

            console.log("5. Enviando para Python...");

            const response = await axios.post('http://localhost:5000/', form, {
                headers: {
                    ...form.getHeaders(),
                },
            });

            console.log("6. Sucesso! Resposta:", response.data);
            return response.data;

        } catch (error: any) {
            console.error("=== ERRO NA REQUISIÇÃO AXIOS ===");
            if (error.response) {
                console.error("Status Python:", error.response.status);
                console.error("Mensagem Python:", error.response.data);
            } else {
                console.error("Erro:", error.message);
            }
            throw new Error("Falha na comunicação com a IA");
        }
    }
}