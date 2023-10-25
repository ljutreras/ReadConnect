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
exports.GetAllBooksController = void 0;
const StatusCode_1 = __importDefault(require("@context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("@context/shared/postgresql/PostgreSQLRepository");
const GetAllBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = [];
        const users = yield PostgreSQLRepository_1.PostgreSQLRepository.create().getAll('books');
        users.map((_, i) => {
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
            });
        });
        res.status(StatusCode_1.default.OK).json(response);
    }
    catch (error) {
        res.status(StatusCode_1.default.BAD_REQUEST).json(error);
    }
});
exports.GetAllBooksController = GetAllBooksController;
