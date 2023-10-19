import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const DeleteProfileController = async(req: Request, res: Response) => {
    const id = req.params.id;
    const data = {
        table: 'profile',
        columns: ['id_p'],
        values: [1],
        constants: [id]
      }
    try {
        const result = await PostgreSQLRepository.create().deleteField(data)
        if (result == 0) return res.status(StatusCode.NOT_FOUND).json()
        return res.status(StatusCode.OK).json({message: 'deleted successfully'})
    } catch (error: any) {
        if (error.file = 'numutils.c') return res.status(StatusCode.BAD_REQUEST).json({error: `invalid param '${id}'`})
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}