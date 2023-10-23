import StatusCode from "@context/shared/constants/StatusCode";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const PaginatorController = async (req: Request, res: Response) => {

    try {
        const page: any = req.query.page || 1;
        const perPage: any = req.query.perPage || 10;

        let books = await PostgreSQLRepository.create().getAll('books'); // obtiene todos los libros

        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;

        const totalBooks = Math.trunc(books.length / perPage) + 1;
        books = books.slice(startIndex, endIndex);
        const response: any[] = [];

        books.map((_, i) => {
            const date = books[i].publisheddate && JSON.parse(books[i].publisheddate)['$date'].substring(0, 10);
            response.push({
                id: books[i]._id,
                title: books[i].title,
                isbn: books[i].isbn,
                pageCount: books[i].pagecount,
                publishedDate: date,
                thumbnailUrl: books[i].thumbnailurl,
                shortDescription: books[i].shortdescription,
                longDescription: books[i].longdescription,
                status: books[i].status,
                authors: books[i].authors,
                categories: books[i].categories,
            })
        })

        return res.status(StatusCode.OK).json({
            data: response,
            total: totalBooks,
            page,
            perPage
        });
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).json(error)
    }

};