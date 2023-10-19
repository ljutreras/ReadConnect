import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const DeleteCourseController = async(req: Request, res: Response) => {
    const id = req.params.id_c
    try {
        await PostgreSQLRepository.create().deleteField('course',['id_c'], [1], [id])
        res.status(200).json({message: 'successful'})
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
    }
}