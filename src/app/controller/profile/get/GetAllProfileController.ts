import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const GetAllProfileController = async(req: Request, res: Response) => {
    const { id } = req.body
    const data = {
        table: 'profile',
        columns: ['p_id'],
        values: [1],
        constants: [id]
      }
    try {
        const courses = (await PostgreSQLRepository.create().client().query(`SELECT * FROM ${data.table}`)).rows
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({
            message: 'invalid value to course',
            error
        })
    }

}