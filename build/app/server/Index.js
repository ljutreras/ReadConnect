"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PostgreSQL_1 = require("../../context/shared/postgresql/PostgreSQL");
const BookRoute_1 = require("../router/BookRoute");
const UsersRoute_1 = require("../router/UsersRoute");
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['*'],
    allowedHeaders: ['Content-Type'],
};
app.use((0, cors_1.default)(corsOptions));
app.use('/users', UsersRoute_1.users);
app.use('/books', BookRoute_1.books);
try {
    PostgreSQL_1.PostgreSQL.create();
}
catch (e) {
    console.log('111111', e);
}
app.listen(3000, () => {
    console.log('Estas en el puerto ', 3000);
});
