import express from 'express';
import bodyParser from 'body-parser';
import { GetAllBooksController } from '../controller/book/get/GetAllBooksController';
import { PaginatorController } from '../controller/book/get/PaginatorController';
import { InsertBookController } from '../controller/book/post/InsertBooksController';
import { OneBookController } from '../controller/book/post/OneBookController';

export const books = express.Router()

books.get('/', GetAllBooksController)
books.post('/insert', bodyParser.json(), InsertBookController)
books.post('/search', bodyParser.json(), OneBookController)
books.get('/paginator', PaginatorController);