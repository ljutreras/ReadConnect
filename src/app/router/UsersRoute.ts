import express from "express";
import bodyParser from "body-parser";
import { DeleteUserController } from "@app/controller/user/delete/DeleteUserController";
import { GetAllUserController } from "@app/controller/user/get/GetAllUserController";
import { SignInUserController } from "@app/controller/user/post/SignInUserController";
import { SignUpUserController } from "@app/controller/user/post/SignUpUserController";
import { UpdateUserController } from "@app/controller/user/put/UpdateUserController";

export const users = express.Router()

users.post('/sign-up', bodyParser.json(), SignUpUserController)
users.post('/sign-in', bodyParser.json(), SignInUserController)
users.delete('/:id', bodyParser.json(), DeleteUserController)
users.put('/:email', bodyParser.json(), UpdateUserController)
users.get('/', bodyParser.json(), GetAllUserController)