import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const SignUpController = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body;
    const data = {
        table: 'profile',
        columns: ['p_first_name', 'p_last_name', 'p_email', 'p_password'],
        values: ['$1','$2','$3','$4'],
        constants: [firstName, lastName, email, password]
      }
    try {
        await PostgreSQLRepository.create().insert(data)
        return res.status(StatusCode.CREATED).json({message: 'Created successfully'})
    } catch (error: any) {
        if (error.constraint == 'profile_p_email_key') return res.status(400).json({ message: 'Someone is already using that email' })
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}