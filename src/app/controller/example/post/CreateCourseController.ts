import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const CreateCourseController = async (req: Request, res: Response) =>{
    const {id, c_name, c_description} = req.body;
    try {
        await PostgreSQLRepository.create().insert('course', ['p_id', 'c_name', 'c_description'], ['$1', '$2', '$3'], [id, c_name, c_description]);
        return res.status(StatusCode.CREATED).json({
            message: 'Successful added course',
            course: {id, c_name, c_description}
        })
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
        
    }
}