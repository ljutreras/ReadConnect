import express from "express";
import bodyParser from "body-parser";
import { SignUpController } from "@app/controller/example/post/SignUpController";
import { SignInController } from "@app/controller/example/post/SignInController";

export const routerAuth = express.Router()

routerAuth.post('/signup', bodyParser.json(), SignUpController)
routerAuth.post('/signin', bodyParser.json(), SignInController)