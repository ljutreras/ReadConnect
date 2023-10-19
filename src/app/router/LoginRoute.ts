import express from "express";
import bodyParser from "body-parser";
import { SignUpController } from "@app/controller/profile/post/SignUpController";
import { SignInController } from "@app/controller/profile/post/SignInController";
import { DeleteProfileController } from "@app/controller/profile/delete/DeleteProfileController";
import { UpdateProfileController } from "@app/controller/profile/put/UpdateProfileController";
import { GetAllProfileController } from "@app/controller/profile/get/GetAllProfileController";

export const profile = express.Router()

profile.post('/sign-up', bodyParser.json(), SignUpController)
profile.post('/sign-in', bodyParser.json(), SignInController)
profile.delete('/user/:id', bodyParser.json(), DeleteProfileController)
profile.put('/user/:email', bodyParser.json(), UpdateProfileController)
profile.get('/user', bodyParser.json(), GetAllProfileController)