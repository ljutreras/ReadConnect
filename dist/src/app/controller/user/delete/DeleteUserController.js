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
exports.DeleteUserController = void 0;
const StatusCode_1 = __importDefault(require("@context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("@context/shared/postgresql/PostgreSQLRepository");
const DeleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = {
        table: 'users',
        columns: ['id_u'],
        values: [1],
        constants: [id]
    };
    try {
        const result = yield PostgreSQLRepository_1.PostgreSQLRepository.create().deleteField(data);
        if (result == 0)
            return res.status(StatusCode_1.default.NOT_FOUND).json();
        return res.status(StatusCode_1.default.OK).json({ message: 'deleted successfully' });
    }
    catch (error) {
        if (error.file = 'numutils.c')
            return res.status(StatusCode_1.default.BAD_REQUEST).json({ error: `invalid param '${id}'` });
        return res.status(StatusCode_1.default.BAD_REQUEST).json({ error });
    }
});
exports.DeleteUserController = DeleteUserController;
