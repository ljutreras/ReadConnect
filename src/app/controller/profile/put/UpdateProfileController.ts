import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const UpdateProfileController = async (req: Request, res: Response) => {
    const emailParams = req.params.email;
    const { firstName, lastName, email } = req.body
    const data = {
        table: 'profile',
        columns: ['p_first_name', 'p_last_name', 'p_email'],
        values: [1, 2, 3],
        constants: [firstName, lastName, email, emailParams]
    }
    try {
        const result = await PostgreSQLRepository.create().updateField(data, ['p_email'], [4])
        if (result == 0) return res.status(StatusCode.NOT_FOUND).json()
        return res.status(StatusCode.OK).json({
            message: 'Successful',
            course: { firstName, lastName, email }
        })
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).json({ error })
    }
}
