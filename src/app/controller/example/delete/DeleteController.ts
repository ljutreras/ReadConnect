import config from '@app/config/Index'
import { MongoRepository } from '@context/shared/persistance/MongoRepository';
import { Request, Response } from "express"

export const DeleteController = async (req: Request, res: Response) => {
    try {
        const ejemplo = MongoRepository.create(config.DATABASE, config.COLLECTION).connectToDatabase()
        const data = req.body
        const result = await ejemplo.deleteOne(data)
        if (result.deletedCount == 0) res.status(400).send({ error: 'No se encontró la petición' })
        res.status(200).json({ mensaje: 'Ejemplo eliminado exitosamente' });
    } catch (error) {
        console.error(error)
    }
}   
