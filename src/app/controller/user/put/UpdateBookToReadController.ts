import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const UpdateBookToReadController = async (req: Request, res: Response) => {
    const emailParams = req.params.email;
    try {
        await PostgreSQLRepository.create().updateBook('users', 'u_books_to_read', req.body.index, emailParams)
        return res.status(StatusCode.OK).json()
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).json({ error })
    }
}