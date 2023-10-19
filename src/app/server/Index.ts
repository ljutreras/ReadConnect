import config from "@app/config/Index";
import { router } from "@app/router/Index";
import { routerCourse } from "@app/router/ProfessorRoute";
import { PostgreSQL } from "@context/shared/postgresql/PostgreSQL";
import express from 'express';

const app = express();

app.use('/', router)
app.use('/professor', routerCourse)

PostgreSQL.create()

app.listen(config.PORT, () => {
    console.log('Estas en el puerto ', config.PORT)
}) 