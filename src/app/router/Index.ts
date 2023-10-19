import express from "express";
import bodyParser from "body-parser";
import { SignUpController } from "@app/controller/example/post/SignUpController";
import { SignInController } from "@app/controller/example/post/SignInController";

export const router = express.Router()

router.post('/signup', bodyParser.json(), SignUpController)
router.post('/signin', bodyParser.json(), SignInController)

