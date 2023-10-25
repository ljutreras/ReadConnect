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
exports.GetAllUserController = void 0;
const StatusCode_1 = __importDefault(require("../../../../context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("../../../../context/shared/postgresql/PostgreSQLRepository");
const GetAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = [];
        const users = yield PostgreSQLRepository_1.PostgreSQLRepository.create().getAll('users');
        users.map((_, i) => {
            response.push({
                id: users[i].id_u,
                firstName: users[i].u_first_name,
                lastName: users[i].u_last_name,
                email: users[i].u_email,
                password: users[i].u_password,
                bookReaded: users[i].u_books_readed,
                bookToRead: users[i].u_books_to_read,
            });
        });
        return res.status(StatusCode_1.default.OK).json(response);
    }
    catch (error) {
        return res.status(StatusCode_1.default.BAD_REQUEST).json(error);
    }
});
exports.GetAllUserController = GetAllUserController;
