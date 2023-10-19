import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const SignInController = async (req: Request, res: Response) => {
    const { email, password, role } = req.body

    if (role == 'professor') {
        try {
            const professor = await PostgreSQLRepository.create().getManyFields('professor', ['p_email','p_password'],[1,2], [email, password])
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
        const student = await PostgreSQLRepository.create().getManyFields('student', ['s_email','s_password'],[1,2], [email, password])
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