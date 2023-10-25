"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Index_1 = __importDefault(require("../config/Index"));
const PostgreSQL_1 = require("../../context/shared/postgresql/PostgreSQL");
const BookRoute_1 = require("../router/BookRoute");
const UsersRoute_1 = require("../router/UsersRoute");
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'fe-readconnect.vercel.app',
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
app.listen(Index_1.default.PORT, () => {
    console.log('Estas en el puerto ', Index_1.default.PORT);
});
