import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const SignInController = async (req: Request, res: Response) => {
    const { email, password, role } = req.body

    if (role == 'professor') {
        try {
            const professor = await PostgreSQLRepository.create().getFields(['p_email','p_password'],['$1', '$2'], [email, password])
            return res.send(professor)

            /* await PostgreSQLRepository.create().insert(['p_email', 'p_password'], ['$1', '$2', '$3'], [email, password])
            return res.status(200).json({
                message: 'successful',
                professor: { email, password }
            }) */
        } catch (error: any) {
            return res.status(400).json({ message: 'invalid value', error })

        }
    }
    return res.send('student')
    /* if (role == 'student') {
        try {
            await PostgreSQLRepository.create().insert(['s_name', 's_email', 's_password'], ['$1', '$2', '$3'], [name, email, password])
            return res.status(200).json({
                message: 'successful',
                student: { name, email, password }
            })
        } catch (error: any) {
            if (error.constraint == 'student_s_email_key') return res.status(400).json({ message: 'Someone is already using that email' })
            return res.status(400).json({ message: 'invalid value', error })

        }
    } */

}