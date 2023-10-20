import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const GetAllUserController = async(req: Request, res: Response) => {
    try {
        const users = await PostgreSQLRepository.create().getAll('users')
        res.status(StatusCode.OK).json(users)
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json(error)
    }

}