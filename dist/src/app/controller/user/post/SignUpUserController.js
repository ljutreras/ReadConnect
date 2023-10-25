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
exports.SignUpUserController = void 0;
const StatusCode_1 = __importDefault(require("@context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("@context/shared/postgresql/PostgreSQLRepository");
const SignUpUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const data = {
        table: 'users',
        columns: ['u_first_name', 'u_last_name', 'u_email', 'u_password'],
        values: [1, 2, 3, 4],
        constants: [firstName, lastName, email, password]
    };
    try {
        yield PostgreSQLRepository_1.PostgreSQLRepository.create().insert(data);
        return res.status(StatusCode_1.default.CREATED).json({ message: 'Created successfully' });
    }
    catch (error) {
        if (error.constraint == 'user_u_email_key')
            return res.status(400).json({ message: 'Someone is already using that email' });
        return res.status(StatusCode_1.default.BAD_REQUEST).json({ error });
    }
});
exports.SignUpUserController = SignUpUserController;
