import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const DeleteBookToReadController = async (req: Request, res: Response) => {
    const { email } = req.body;
    const data = {
        table: 'users',
        columns: ['u_email'],
        values: [1],
        constants: [email]
    }
    try {
        const users = await PostgreSQLRepository.create().getManyFieldsV2(data)
        const bookToReaded = users.u_books_to_read
        const newBookToReaded = bookToReaded.filter((element: any) => {
            return element.id !== Number(req.params.id)
        })
        const userBook = {
            id: users.id_u,
            firstName: users.u_first_name,
            lastName: users.u_last_name,
            email: users.u_email,
            password: users.u_password,
            bookReaded: users.u_books_readed,
            bookToRead: newBookToReaded,
        }
        const dataV2 = {
            table: 'users',
            columns: ['u_first_name', 'u_last_name', 'u_books_readed', 'u_books_to_read'],
            values: [1, 2, 3, 4],
            constants: [users.u_first_name, users.u_last_name, users.u_books_readed, userBook.bookToRead]
        }

        await PostgreSQLRepository.create().updateFieldV2(dataV2);
        return res.status(StatusCode.OK).json(userBook)
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).json({ error })
    }
}