import StatusCode from "@context/shared/constants/StatusCode";
import { ISearchFilters } from "@context/shared/interface/ISearchBook";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const OneBookController = async (req: Request, res: Response) => {
    const filters: ISearchFilters = req.body;
    try {
        const response: any[] = [];
        const users = await PostgreSQLRepository.create().getBooksQuery(filters, 'books')
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
        return res.status(StatusCode.OK).json({
            data: response,
            totalPage: '33',
            page: '1',
            perPage: '1'
        })
    } catch (error: any) {
        if (error.id_u == undefined) return res.status(StatusCode.NOT_FOUND).json()
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}