export interface IIdentificationRepository{
    identificate(file: Express.Multer.File): Promise<any>
}