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
exports.PostgreSQLRepository = void 0;
const Index_1 = __importDefault(require("../../../app/config/Index"));
const pg_1 = require("pg");
class PostgreSQLRepository {
    constructor() { }
    client() {
        const client = new pg_1.Pool({
            user: Index_1.default.USER_DB,
            host: Index_1.default.HOST_DB,
            database: Index_1.default.DB,
            password: Index_1.default.PASSWORD_DB,
            port: Number(Index_1.default.PORT_DB),
            ssl: true,
        });
        return client;
    }
    /* INSERT */
    insert(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, columns, values, constants } = options;
            const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${values.map((_, i) => `$${i + 1}`).join(',')})`;
            yield this.client().query(query, constants);
        });
    }
    insertBookQuery(table, book) {
        const params = Object.keys(book);
        const values = Object.values(book).map((val, i) => `$${i + 1}`);
        const query = `INSERT INTO ${table} (${params.join(', ')}) VALUES (${values.join(', ')});`;
        return query;
    }
    insertUserBook(options) {
        const { table, column, book, columnWhere, pathParams } = options;
        const query = `UPDATE ${table} SET ${column} = array_append(${column}, '${JSON.stringify(book)}') WHERE ${columnWhere} = '${pathParams}' ;`;
        return query;
    }
    /* GET */
    getManyFields(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, columns, values, constants } = options;
            const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(' AND ')}`;
            const res = yield this.client().query(query, constants);
            return res.rows[0];
        });
    }
    getManyFieldsV2(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, columns, values, constants } = options;
            const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(' AND ')}`;
            const res = yield this.client().query(query, constants);
            return res.rows[0];
        });
    }
    getOneField(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, columns, values, constants } = options;
            const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`)}`;
            const res = yield this.client().query(query, constants);
            return res.rows[0];
        });
    }
    getAllField(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, columns, values, constants } = options;
            const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`)}`;
            const res = yield this.client().query(query, constants);
            return res.rows;
        });
    }
    getAll(table) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${table}`;
            const res = yield this.client().query(query);
            return res.rows;
        });
    }
    getBooksQuery(filters, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const conditions = [];
            if (filters.title)
                conditions.push(`title ILIKE '%${filters.title}%'`);
            if (filters.pageCount)
                conditions.push(`pagecount = '${filters.pageCount}'`);
            if (filters.categories) {
                const categories = filters.categories;
                if (!Array.isArray(categories)) {
                    throw new Error('categories should be an array.');
                }
                const categoriesCondition = categories.map((category, i) => `categories[${i + 1}] = '${category}'`).join(' OR ');
                conditions.push(categoriesCondition);
            }
            if (filters.authors) {
                const authors = filters.authors;
                if (!Array.isArray(authors)) {
                    throw new Error('authors should be an array.');
                }
                const authorsCondition = authors.map((author, i) => `authors[${i + 1}] = '${author}'`).join(' OR ');
                conditions.push(authorsCondition);
            }
            let query = `SELECT * FROM ${title}`;
            if (conditions.length)
                query += ` WHERE ${conditions.join(' AND ')}`;
            const result = yield this.client().query(query);
            return result.rows;
        });
    }
    /* UPDATE */
    updateField(options, id, valueId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, columns, values, constants } = options;
            const query = `UPDATE ${table} SET ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(',')} WHERE ${id} = $${valueId}`;
            const result = yield this.client().query(query, constants);
            return result.rowCount;
        });
    }
    updateFieldV2(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, columns, values, constants } = options;
            const query = `UPDATE ${table} SET ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(',')}`;
            const result = yield this.client().query(query, constants);
            return result.rowCount;
        });
    }
    updateBook(table, column, value, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE ${table} SET ${column}[${value}]= NULL::json WHERE u_email = '${email}'`;
            yield this.client().query(query);
        });
    } // UPDATE public.users SET u_books_readed[2] = NULL::json WHERE id_u = 2;
    /* DELETE */
    deleteField(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, columns, values, constants } = options;
            const query = `DELETE FROM ${table} WHERE ${columns} = $${values}`;
            const result = yield this.client().query(query, constants);
            return result.rowCount;
        });
    }
    static create() {
        return new PostgreSQLRepository();
    }
}
exports.PostgreSQLRepository = PostgreSQLRepository;
