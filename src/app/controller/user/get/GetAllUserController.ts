import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const GetAllUserController = async(req: Request, res: Response) => {
    try {
        const response: any[] = [];
        const users = await PostgreSQLRepository.create().getAll('users')
        users.map((_,i) => {
            response.push({
                id: users[i].id_u,
                firstName: users[i].u_first_name,
                lastName: users[i].u_last_name,
                email: users[i].u_email,
                password: users[i].u_password,
                bookReaded: users[i].u_books_readed,
                bookToRead: users[i].u_books_to_read,
            })
        })
        return res.status(StatusCode.OK).json(response)
    } catch (error) {
        return res.status(StatusCode.BAD_REQUEST).json(error)
    }

}