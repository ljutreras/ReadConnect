
import { Request, Response } from "express";
import StatusCode from "../../../../context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "../../../../context/shared/postgresql/PostgreSQLRepository";

export const InsertBookController = async (req: Request, res: Response) => {
    const book: any[] = req.body;
    try {
        book.map(async (_, element) => {
            const query = PostgreSQLRepository.create().insertBookQuery('books', book[element]);
            await PostgreSQLRepository.create().client().query(query, Object.values(book[element]));
        })
        return res.status(StatusCode.CREATED).json({ message: 'inserted' });
    } catch (error: any) {
        if (error.file == 'nbtinsert.c') return res.status(StatusCode.BAD_REQUEST).json({ message: `Someone is already using that id` })
        return res.status(StatusCode.BAD_REQUEST).json({ error })
    }

}