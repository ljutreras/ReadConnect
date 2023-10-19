import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const SignUpController = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body;
    const data = {
        table: 'login',
        columns: ['l_first_name', 'l_last_name', 'l_email', 'l_password'],
        values: ['$1','$2','$3','$4'],
        constants: [firstName, lastName, email, password]
      }
    try {
        await PostgreSQLRepository.create().insert(data)
        return res.status(StatusCode.CREATED).json({message: 'Created successfully'})
    } catch (error: any) {
        if (error.constraint == 'login_l_email_key') return res.status(400).json({ message: 'Someone is already using that email' })
        return res.status(400).json({error})
    }
}