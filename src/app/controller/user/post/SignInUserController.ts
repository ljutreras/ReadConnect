import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const SignInUserController = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const data = {
        table: 'users',
        columns: ['u_email','u_password'],
        values: [1,2],
        constants: [email, password]
      }
    try {
        const result = await PostgreSQLRepository.create().getManyFields(data)
        return res.status(StatusCode.OK).json({
            id: result.id_u,
            firstName: result.u_first_name,
            lastName: result.u_last_name,
            email: result.u_email,
            password: result.u_password
        })
    } catch (error: any) {
        if (error.id_l == undefined) return res.status(StatusCode.NOT_FOUND).json()
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}