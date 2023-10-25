"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQL = void 0;
const Index_1 = __importDefault(require("../../../app/config/Index"));
const pg_1 = require("pg");
class PostgreSQL {
    constructor() {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            const client = new pg_1.Client({
                user: Index_1.default.USER_DB,
                host: Index_1.default.HOST_DB,
                database: Index_1.default.DB,
                password: Index_1.default.PASSWORD_DB,
                port: Number(Index_1.default.PORT_DB),
                ssl: true,
            });
            try {
                yield client.connect();
                console.log('Connection with PostgreSQL Success');
                return client;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    static create() {
        return new PostgreSQL().connect();
    }
}
exports.PostgreSQL = PostgreSQL;
