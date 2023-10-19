import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const DeleteCourseController = async(req: Request, res: Response) => {
    const id = req.params.id_c
    const data = {
        table: 'course',
        columns: ['id_c'],
        values: [1],
        constants: [id]
      }
    try {
        await PostgreSQLRepository.create().deleteField(data)
        res.status(200).json({message: 'successful'})
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
    }
}