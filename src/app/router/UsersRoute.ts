import express from "express";
import bodyParser from "body-parser";
import { DeleteUserController } from "@app/controller/user/delete/DeleteUserController";
import { GetAllUserController } from "@app/controller/user/get/GetAllUserController";
import { SignInUserController } from "@app/controller/user/post/SignInUserController";
import { SignUpUserController } from "@app/controller/user/post/SignUpUserController";
import { UpdateUserController } from "@app/controller/user/put/UpdateUserController";
import { UserBookReadedController } from "@app/controller/user/post/UserBookReadedController";
import { UserBookToReadController } from "@app/controller/user/post/UserBookToReadController";
import { DeleteBookToReadController } from "@app/controller/user/delete/DeleteBookToReadController";
import { DeleteBookReadedController } from "@app/controller/user/delete/DeleteBookReadedController";

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