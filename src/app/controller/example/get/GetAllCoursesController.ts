import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const GetAllCoursesController = async(req: Request, res: Response) => {
    const { id } = req.body
    const data = {
        table: 'course',
        columns: ['p_id'],
        values: [1],
        constants: [id]
      }
    try {
        const courses = await PostgreSQLRepository.create().getAllField(data)
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
    }

}