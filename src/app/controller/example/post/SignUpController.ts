import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const SignUpController = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body
    const data = {
        table: 'professor',
        columns: ['p_name', 'p_email', 'p_password'],
        values: ['$1', '$2', '$3'],
        constants: [name, email, password]
      }

    if (role == 'professor') {
        try {
            await PostgreSQLRepository.create().insert(data)
            return res.status(200).json({
                message: 'successful',
                professor: { name, email, password }
            })
        } catch (error: any) {
            if (error.constraint == 'professor_p_email_key') return res.status(400).json({ message: 'Someone is already using that email' })
            return res.status(400).json({ message: 'invalid value', error })
        }
    }
    try {
        const data = {
            table: 'student',
            columns: ['s_name', 's_email', 's_password'],
            values: ['$1', '$2', '$3'],
            constants: [name, email, password]
          }
        await PostgreSQLRepository.create().insert(data)
        return res.status(200).json({
            message: 'successful',
            student: { name, email, password }
        })
    } catch (error: any) {
        if (error.constraint == 'student_s_email_key') return res.status(400).json({ message: 'Someone is already using that email' })
        return res.status(400).json({ message: 'invalid value', error })

    }

}