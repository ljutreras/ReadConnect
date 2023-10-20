import express from 'express';
import bodyParser from 'body-parser';
import { InsertBookController } from '@app/controller/book/post/InsertBooksController';
import { GetAllBooksController } from '@app/controller/book/get/GetAllBooksController';

export const books = express.Router()

books.get('/', GetAllBooksController)
books.post('/insert', bodyParser.json(), InsertBookController)