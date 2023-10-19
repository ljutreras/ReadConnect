import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const CreateCourseController = async (req: Request, res: Response) =>{
    const {id, c_name, c_description} = req.body;
    const data = {
        table: 'course',
        columns: ['p_id', 'c_name', 'c_description'],
        values: ['$1', '$2', '$3'],
        constants: [id, c_name, c_description]
      }
    try {
        await PostgreSQLRepository.create().insert(data);
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