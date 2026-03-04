import { IIdentificationRepository } from "../interfaces/IIdentificationRepository";
import axios from 'axios';
import FormData from 'form-data';

require('dotenv').config({ path: '.env' });

export class IdentificationRepository implements IIdentificationRepository{
    constructor(){}


async identificate(file: Express.Multer.File): Promise<any> {
    try {
        const form = new FormData();
        console.log("batata")
        console.log(file)
        form.append('imagem', file.buffer, file.originalname);

        const response = await axios.post(process.env.FLASK_URL || 'http://localhost:5000/', form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        return response.data;

    } catch (error) {
        console.error("Erro ao enviar para a IA:", error);
        throw new Error("Erro de comunicação com o serviço de IA");
    }
}

}