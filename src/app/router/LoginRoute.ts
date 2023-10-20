import express from "express";
import bodyParser from "body-parser";
import { DeleteUserController } from "@app/controller/user/delete/DeleteProfileController";
import { GetAllUserController } from "@app/controller/user/get/GetAllProfileController";
import { SignInUserController } from "@app/controller/user/post/SignInUserController";
import { SignUpUserController } from "@app/controller/user/post/SignUpUserController";
import { UpdateUserController } from "@app/controller/user/put/UpdateUserController";

export const profile = express.Router()

profile.post('/sign-up', bodyParser.json(), SignUpUserController)
profile.post('/sign-in', bodyParser.json(), SignInUserController)
profile.delete('/:id', bodyParser.json(), DeleteUserController)
profile.put('/:email', bodyParser.json(), UpdateUserController)
profile.get('/', bodyParser.json(), GetAllUserController)