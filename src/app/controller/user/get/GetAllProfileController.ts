import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const GetAllUserController = async(req: Request, res: Response) => {
    try {
        const courses = await PostgreSQLRepository.create().getAll('users')
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
    }

}