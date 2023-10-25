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
exports.InsertBookController = void 0;
const StatusCode_1 = __importDefault(require("../../../../context/shared/constants/StatusCode"));
const PostgreSQLRepository_1 = require("../../../../context/shared/postgresql/PostgreSQLRepository");
const InsertBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    try {
        book.map((_, element) => __awaiter(void 0, void 0, void 0, function* () {
            const query = PostgreSQLRepository_1.PostgreSQLRepository.create().insertBookQuery('books', book[element]);
            yield PostgreSQLRepository_1.PostgreSQLRepository.create().client().query(query, Object.values(book[element]));
        }));
        return res.status(StatusCode_1.default.CREATED).json({ message: 'inserted' });
    }
    catch (error) {
        if (error.file == 'nbtinsert.c')
            return res.status(StatusCode_1.default.BAD_REQUEST).json({ message: `Someone is already using that id` });
        return res.status(StatusCode_1.default.BAD_REQUEST).json({ error });
    }
});
exports.InsertBookController = InsertBookController;
