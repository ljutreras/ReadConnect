"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatorController = void 0;
const StatusCode_1 = __importDefault(require("@context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("@context/shared/postgresql/PostgreSQLRepository");
const PaginatorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const perPage = req.query.perPage || 10;
        let books = yield PostgreSQLRepository_1.PostgreSQLRepository.create().getAll('books'); // obtiene todos los libros
        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;
        const totalBooks = Math.trunc(books.length / perPage) + 1;
        books = books.slice(startIndex, endIndex);
        const response = [];
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
            });
        });
        return res.status(StatusCode_1.default.OK).json({
            data: response,
            totalPage: totalBooks,
            page,
            perPage
        });
    }
    catch (error) {
        res.status(StatusCode_1.default.BAD_REQUEST).json(error);
    }
});
exports.PaginatorController = PaginatorController;
