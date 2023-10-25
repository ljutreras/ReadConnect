import { Request, Response } from "express";
import StatusCode from "../../../../context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "../../../../context/shared/postgresql/PostgreSQLRepository";

export const SignUpUserController = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body;
    const data = {
        table: 'users',
        columns: ['u_first_name', 'u_last_name', 'u_email', 'u_password'],
        values: [1,2,3,4],
        constants: [firstName, lastName, email, password]
      }
    try {
        await PostgreSQLRepository.create().insert(data)
        return res.status(StatusCode.CREATED).json({message: 'Created successfully'})
    } catch (error: any) {
        if (error.constraint == 'user_u_email_key') return res.status(400).json({ message: 'Someone is already using that email' })
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}