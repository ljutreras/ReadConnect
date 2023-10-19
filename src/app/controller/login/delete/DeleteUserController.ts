import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const DeleteUserController = async(req: Request, res: Response) => {
    const id = req.params.id;
    const data = {
        table: 'login',
        columns: ['id_l'],
        values: [1],
        constants: [id]
      }
    try {
        const result = await PostgreSQLRepository.create().deleteField(data)
        if (result == undefined) return res.status(StatusCode.NOT_FOUND).json(result)
        return res.status(StatusCode.OK).json({message: 'deleted user'})
        
    } catch (error) {
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}