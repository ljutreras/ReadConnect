import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const GetAllCoursesController = async(req: Request, res: Response) => {
    const { id } = req.body
    try {
        const courses = await PostgreSQLRepository.create().getAllField('course', ['p_id'], [1], [id])
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
    }

}