import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const UpdateCourseController = async(req: Request, res: Response) => {
    const id = req.params.id_c;
    const {c_name, c_description} = req.body
    try {
        await PostgreSQLRepository.create().updateField('course', ['c_name', 'c_description'], [1,2], ['id_c'], [3], [c_name, c_description, id])
        return res.status(200).json({
            message: 'Successful',
            course: {c_name, c_description}
        })
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
    }
}