import express from "express";
import bodyParser from "body-parser";
import { SignUpController } from "@app/controller/login/post/SignUpController";
import { SignInController } from "@app/controller/login/post/SignInController";
import { DeleteUserController } from "@app/controller/login/delete/DeleteUserController";

export const login = express.Router()

login.post('/sign-up', bodyParser.json(), SignUpController)
login.post('/sign-in', bodyParser.json(), SignInController)
login.delete('/user/:id', bodyParser.json(), DeleteUserController)