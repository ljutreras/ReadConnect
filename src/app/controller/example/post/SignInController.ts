import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const SignInController = async (req: Request, res: Response) => {
    const { email, password, role } = req.body

    if (role == 'professor') {
        const data = {
            table: 'professor',
            columns: ['p_email','p_password'],
            values: [1,2],
            constants: [email, password]
          }
        try {
            const professor = await PostgreSQLRepository.create().getManyFields(data)
            return res.status(200).json({
                id: professor.id_p,
                name: professor.p_name,
                email: professor.p_email,
                role: 'professor',
            })
        } catch (error: any) {
            return res.status(400).json({ message: 'invalid value', error })

        }
    }
    try {
        const data = {
            table: 'student',
            columns: ['s_email','s_password'],
            values: [1,2],
            constants: [email, password]
          }
        const student = await PostgreSQLRepository.create().getManyFields(data)
        return res.status(200).json({
            id: student.id_s,
            name: student.s_name,
            email: student.s_email,
            role: 'student',
        })
    } catch (error: any) {
        return res.status(400).json({ message: 'invalid value', error })

    }

}