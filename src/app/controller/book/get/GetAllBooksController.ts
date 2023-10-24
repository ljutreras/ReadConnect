import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const GetAllBooksController = async (req: Request, res: Response) => {
    try {
        const response: any[] = [];
        const users = await PostgreSQLRepository.create().getAll('books')
        users.map((_,i) => {
            const date = users[i].publisheddate && JSON.parse(users[i].publisheddate)['$date'].substring(0, 10);
            response.push({
                id: users[i]._id,
                title: users[i].title,
                isbn: users[i].isbn,
                pageCount: users[i].pagecount,
                publishedDate: date,
                thumbnailUrl: users[i].thumbnailurl,
                shortDescription: users[i].shortdescription,
                longDescription: users[i].longdescription,
                status: users[i].status,
                authors: users[i].authors,
                categories: users[i].categories,
            })
        })
        res.status(StatusCode.OK).json(response)
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json(error)
    }
}