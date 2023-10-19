import express from "express";
import bodyParser from "body-parser";
import { CreateCourseController } from "@app/controller/example/post/CreateCourseController";
import { ReadCourseController } from "@app/controller/example/get/ReadCourseController";
import { UpdateCourseController } from "@app/controller/example/put/UpdateCourseController";
import { DeleteCourseController } from "@app/controller/example/delete/DeleteCourseController";
import { GetAllCoursesController } from "@app/controller/example/get/GetAllCoursesController";

export const routerCourse = express.Router()

routerCourse.post('/course', bodyParser.json(), CreateCourseController)
routerCourse.post('/my-courses', bodyParser.json(), GetAllCoursesController)
routerCourse.get('/course/:id_c', ReadCourseController)
routerCourse.put('/course/:id_c', bodyParser.json(), UpdateCourseController)
routerCourse.delete('/course/:id_c', bodyParser.json(), DeleteCourseController)
