import StatusCode from "@context/shared/constants/StatusCode";
import { Request, Response } from "express";

export const GetAllBooksController = (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).json({ error })
    }
}