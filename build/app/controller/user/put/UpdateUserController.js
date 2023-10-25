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
exports.UpdateUserController = void 0;
const StatusCode_1 = __importDefault(require("../../../../context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("../../../../context/shared/postgresql/PostgreSQLRepository");
const UpdateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailParams = req.params.email;
    const { firstName, lastName, email } = req.body;
    const data = {
        table: 'users',
        columns: ['u_first_name', 'u_last_name', 'u_email'],
        values: [1, 2, 3],
        constants: [firstName, lastName, email, emailParams]
    };
    try {
        const result = yield PostgreSQLRepository_1.PostgreSQLRepository.create().updateField(data, ['u_email'], [4]);
        if (result == 0)
            return res.status(StatusCode_1.default.NOT_FOUND).json();
        return res.status(StatusCode_1.default.OK).json({
            message: 'Successful',
            body: { firstName, lastName, email }
        });
    }
    catch (error) {
        return res.status(StatusCode_1.default.BAD_REQUEST).json({ error });
    }
});
exports.UpdateUserController = UpdateUserController;
