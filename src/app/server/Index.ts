import config from "@app/config/Index";
import { router } from "@app/router/Index";
import { profile } from "@app/router/LoginRoute";
import { routerCourse } from "@app/router/ProfessorRoute";
import { PostgreSQL } from "@context/shared/postgresql/PostgreSQL";
import express from 'express';

const app = express();

app.use('/', router)
app.use('/professor', routerCourse)
app.use('/users', profile)

PostgreSQL.create()

app.listen(config.PORT, () => {
    console.log('Estas en el puerto ', config.PORT)
}) 