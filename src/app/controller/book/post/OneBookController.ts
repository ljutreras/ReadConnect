import StatusCode from "@context/shared/constants/StatusCode";
import { ISearchFilters } from "@context/shared/interface/ISearchBook";
import { PostgreSQLRepository } from "@context/shared/postgresql/PostgreSQLRepository";
import { Request, Response } from "express";

export const OneBookController = async (req: Request, res: Response) => {
    const filters: ISearchFilters = req.body;
    try {
        const query = await PostgreSQLRepository.create().getBooksQuery(filters, 'books')
        return res.status(StatusCode.OK).json(query)
    } catch (error: any) {
        if (error.id_u == undefined) return res.status(StatusCode.NOT_FOUND).json()
        return res.status(StatusCode.BAD_REQUEST).json({error})
    }
}