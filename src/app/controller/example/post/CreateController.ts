import config from '@app/config/Index'
import StatusCode from '@context/shared/constants/StatusCode'
import { MongoRepository } from '@context/shared/persistance/MongoRepository'
import { Request, Response } from "express"

export const CreateController = async (req: Request, res: Response) => {
    try {
        const ejemplo = MongoRepository.create(config.DATABASE, config.COLLECTION).connectToDatabase()
        const data = req.body
        await ejemplo.insertOne(data)
        res.status(StatusCode.CREATED).json({ mensaje: 'Ejemplo creado exitosamente' });
    } catch (error) {
        console.error(error)
    }
}