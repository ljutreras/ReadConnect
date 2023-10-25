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
exports.SignInUserController = void 0;
const StatusCode_1 = __importDefault(require("../../../../context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("../../../../context/shared/postgresql/PostgreSQLRepository");
const SignInUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const data = {
        table: 'users',
        columns: ['u_email', 'u_password'],
        values: [1, 2],
        constants: [email, password]
    };
    try {
        const users = yield PostgreSQLRepository_1.PostgreSQLRepository.create().getManyFields(data);
        return res.status(StatusCode_1.default.OK).json({
            id: users.id_u,
            firstName: users.u_first_name,
            lastName: users.u_last_name,
            email: users.u_email,
            password: users.u_password,
            bookReaded: users.u_books_readed,
            bookToRead: users.u_books_to_read,
        });
    }
    catch (error) {
        if (error.id_u == undefined)
            return res.status(StatusCode_1.default.NOT_FOUND).json();
        return res.status(StatusCode_1.default.BAD_REQUEST).json({ error });
    }
});
exports.SignInUserController = SignInUserController;
