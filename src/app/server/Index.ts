import config from "@app/config/Index";
import { users } from "@app/router/UsersRoute";
import { PostgreSQL } from "@context/shared/postgresql/PostgreSQL";
import express from 'express';
import { books } from "@app/router/BookRoute";

const app = express();

app.use('/users', users)
app.use('/books', books)

PostgreSQL.create()

app.listen(config.PORT, () => {
    console.log('Estas en el puerto ', config.PORT)
}) 