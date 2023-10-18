
import config from '@app/config/Index'
import { BaseController } from '@app/controller/BaseController';
import StatusCode from '@context/shared/constants/StatusCode';
import { MongoRepository } from '@context/shared/persistance/MongoRepository';
import { NextFunction, Request, Response } from "express"

export default class GetController implements BaseController {
    async run(req: Request, res: Response, next: NextFunction) {
        console.log('+++++++++')
        try {
            const ejemplo = MongoRepository.create(config.DATABASE, config.COLLECTION).connectToDatabase()
            console.log("🚀 ~ file: GetController.ts:12 ~ GetController ~ run ~ ejemplo:", ejemplo)
            const result = await ejemplo.findOne(req.query)
            if (!result) res.status(StatusCode.BAD_REQUEST).send({ error: 'invalid value' })
            res.status(StatusCode.OK).json(result);
        } catch (e) {
            console.error(e)
        }

    }
}

/* export const GetController = async (req: Request, res: Response) => {
    try {
        const ejemplo = MongoRepository.create(config.DATABASE, config.COLLECTION).connectToDatabase()
        const result = await ejemplo.findOne(req.query)
        if (!result) res.status(StatusCode.BAD_REQUEST).send({ error: 'invalid value' })
        res.status(StatusCode.OK).json(result);
    } catch (e) {
        console.error(e)
    }
    
} */
