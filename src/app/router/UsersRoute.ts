import express from "express";
import bodyParser from "body-parser";
import { DeleteBookReadedController } from "../controller/user/delete/DeleteBookReadedController";
import { DeleteBookToReadController } from "../controller/user/delete/DeleteBookToReadController";
import { DeleteUserController } from "../controller/user/delete/DeleteUserController";
import { GetAllUserController } from "../controller/user/get/GetAllUserController";
import { SignInUserController } from "../controller/user/post/SignInUserController";
import { SignUpUserController } from "../controller/user/post/SignUpUserController";
import { UserBookReadedController } from "../controller/user/post/UserBookReadedController";
import { UserBookToReadController } from "../controller/user/post/UserBookToReadController";
import { UpdateUserController } from "../controller/user/put/UpdateUserController";

export const users = express.Router()

users.get('/', bodyParser.json(), GetAllUserController)
users.put('/:email', bodyParser.json(), UpdateUserController)
users.delete('/book/readed/:id', bodyParser.json(), DeleteBookReadedController)
users.delete('/book/to-read/:id', bodyParser.json(), DeleteBookToReadController)
users.post('/sign-up', bodyParser.json(), SignUpUserController)
users.post('/sign-in', bodyParser.json(), SignInUserController)
users.post('/book/readed/:email', bodyParser.json(), UserBookReadedController)
users.post('/book/to-read/:email', bodyParser.json(), UserBookToReadController)
users.delete('/:id', bodyParser.json(), DeleteUserController)