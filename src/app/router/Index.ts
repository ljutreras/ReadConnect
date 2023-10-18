import { DeleteController } from "@app/controller/example/delete/DeleteController";
/* import { GetController } from "@app/controller/example/get/GetController";
 */import { CreateController } from "@app/controller/example/post/CreateController";
import bodyParser from "body-parser";
import express from "express";

export const router = express.Router()

/* router.get('/', GetController)
 */router.post('/about', bodyParser.json(), CreateController)
router.delete('/about', bodyParser.json(), DeleteController)
