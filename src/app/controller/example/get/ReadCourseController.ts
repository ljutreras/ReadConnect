import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const ReadCourseController = async (req: Request, res: Response) =>{
    const id = req.params.id_c;
    try {
        const course = await PostgreSQLRepository.create().getOneField('course', ['id_c'],[1],[id])
        return res.status(200).json({course})
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
        
    }
}