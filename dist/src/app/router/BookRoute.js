"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.books = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const InsertBooksController_1 = require("@app/controller/book/post/InsertBooksController");
const GetAllBooksController_1 = require("@app/controller/book/get/GetAllBooksController");
const OneBookController_1 = require("@app/controller/book/post/OneBookController");
const PaginatorController_1 = require("@app/controller/book/get/PaginatorController");
exports.books = express_1.default.Router();
exports.books.get('/', GetAllBooksController_1.GetAllBooksController);
exports.books.post('/insert', body_parser_1.default.json(), InsertBooksController_1.InsertBookController);
exports.books.post('/search', body_parser_1.default.json(), OneBookController_1.OneBookController);
exports.books.get('/paginator', PaginatorController_1.PaginatorController);
