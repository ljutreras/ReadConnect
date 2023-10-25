import { Request, Response } from "express";
import StatusCode from "../../../../context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "../../../../context/shared/postgresql/PostgreSQLRepository";

export const SignInUserController = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const data = {
        table: 'users',
        columns: ['u_email','u_password'],
        values: [1,2],
        constants: [email, password]
      }
    try {
        const users = await PostgreSQLRepository.create().getManyFields(data)
        return res.status(StatusCode.OK).json({
            id: users.id_u,
            firstName: users.u_first_name,
            lastName: users.u_last_name,
            email: users.u_email,
            password: users.u_password,
            bookReaded: users.u_books_readed,
            bookToRead: users.u_books_to_read,
        })
    } catch (error: any) {
        if (error.id_u == undefined) return res.status(StatusCode.NOT_FOUND).json()
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}