import express from 'express';
import cors from 'cors';
import { PostgreSQL } from '../../context/shared/postgresql/PostgreSQL';
import { books } from '../router/BookRoute';
import { users } from '../router/UsersRoute';

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['*'],
    allowedHeaders: ['Content-Type'],
}

app.use(cors(corsOptions));

app.use('/users', users)
app.use('/books', books)

try{
    PostgreSQL.create()
}catch(e) {
    console.log('111111', e)
}

app.listen(3000, () => {
    console.log('Estas en el puerto ', 3000)
}) 