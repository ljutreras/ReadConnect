import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const SignInController = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const data = {
        table: 'profile',
        columns: ['p_email','p_password'],
        values: [1,2],
        constants: [email, password]
      }
    try {
        const result = await PostgreSQLRepository.create().getManyFields(data)
        return res.status(StatusCode.OK).json({
            id: result.id_p,
            firstName: result.p_first_name,
            lastName: result.p_last_name,
            email: result.p_email,
            password: result.p_password
        })
    } catch (error: any) {
        if (error.id_l == undefined) return res.status(StatusCode.NOT_FOUND).json()
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}