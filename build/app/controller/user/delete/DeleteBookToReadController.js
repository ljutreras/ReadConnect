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
exports.DeleteBookToReadController = void 0;
const StatusCode_1 = __importDefault(require("../../../../context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("../../../../context/shared/postgresql/PostgreSQLRepository");
const DeleteBookToReadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const data = {
        table: 'users',
        columns: ['u_email'],
        values: [1],
        constants: [email]
    };
    try {
        const users = yield PostgreSQLRepository_1.PostgreSQLRepository.create().getManyFieldsV2(data);
        const bookToReaded = users.u_books_to_read;
        const newBookToReaded = bookToReaded.filter((element) => {
            return element.id !== Number(req.params.id);
        });
        const userBook = {
            id: users.id_u,
            firstName: users.u_first_name,
            lastName: users.u_last_name,
            email: users.u_email,
            password: users.u_password,
            bookReaded: users.u_books_readed,
            bookToRead: newBookToReaded,
        };
        const dataV2 = {
            table: 'users',
            columns: ['u_first_name', 'u_last_name', 'u_books_readed', 'u_books_to_read'],
            values: [1, 2, 3, 4],
            constants: [users.u_first_name, users.u_last_name, users.u_books_readed, userBook.bookToRead]
        };
        yield PostgreSQLRepository_1.PostgreSQLRepository.create().updateFieldV2(dataV2);
        return res.status(StatusCode_1.default.OK).json(userBook);
    }
    catch (error) {
        return res.status(StatusCode_1.default.BAD_REQUEST).json({ error });
    }
});
exports.DeleteBookToReadController = DeleteBookToReadController;
