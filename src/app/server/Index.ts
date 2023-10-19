import config from "@app/config/Index";
import { routerAuth } from "@app/router/Auth";
import { router } from "@app/router/Index";
import { PostgreSQL } from "@context/shared/postgresql/PostgreSQL";
import express from 'express';

const app = express();

app.use('/server', router)
app.use('/postgresql', router)
app.use('/', routerAuth)

PostgreSQL.create()

app.listen(config.PORT, () => {
    console.log('Estas en el puerto ', config.PORT)
}) 