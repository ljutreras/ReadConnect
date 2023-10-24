import express from 'express';
import bodyParser from 'body-parser';
import { InsertBookController } from '@app/controller/book/post/InsertBooksController';
import { GetAllBooksController } from '@app/controller/book/get/GetAllBooksController';
import { OneBookController } from '@app/controller/book/post/OneBookController';
import { PaginatorController } from '@app/controller/book/get/PaginatorController';

export const books = express.Router()

books.get('/', GetAllBooksController)
books.post('/insert', bodyParser.json(), InsertBookController)
books.post('/search', bodyParser.json(), OneBookController)
books.get('/paginator', PaginatorController);