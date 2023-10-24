import { Pool } from "pg";
import { InsertBook, QueryOptions } from "../interface/QueryOptions"
import { IBooks } from "../interface/IBooks";
import { ISearchFilters } from "../interface/ISearchBook";

export class PostgreSQLRepository {
    constructor() { }

    client() {
        const client = new Pool({
            user: 'kpqljntf',
            host: 'isabelle.db.elephantsql.com',
            database: 'kpqljntf',
            password: 'rXGVulkGCylJ1qqfKDxWNMty_52hbuIJ',
            port: 5432,
            ssl: true,
        });
        return client
    }

    /* INSERT */
    async insert(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${values.map((_, i) => `$${i + 1}`).join(',')})`;
        await this.client().query(query, constants);
    }

    insertBookQuery(table: string, book: IBooks[]): string {

        const params = Object.keys(book);
        const values = Object.values(book).map((val, i) => `$${i + 1}`);
        const query = `INSERT INTO ${table} (${params.join(', ')}) VALUES (${values.join(', ')});`;
        return query;

    }

    insertUserBook(options: InsertBook) {
        const { table, column, book, columnWhere, pathParams } = options;
        const query = `UPDATE ${table} SET ${column} = array_append(${column}, '${JSON.stringify(book)}') WHERE ${columnWhere} = '${pathParams}' ;`;
        return query;
    }

    /* GET */
    async getManyFields(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(' AND ')}`;
        const res = await this.client().query(query, constants);
        return res.rows[0];
    }

    async getManyFieldsV2(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(' AND ')}`;
        const res = await this.client().query(query, constants);
        return res.rows[0];
    }

    async getOneField(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`)}`;
        const res = await this.client().query(query, constants);
        return res.rows[0];
    }

    async getAllField(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`)}`;
        const res = await this.client().query(query, constants);
        return res.rows;
    }
    async getAll(table: string) {
        const query = `SELECT * FROM ${table}`;
        const res = await this.client().query(query);
        return res.rows;
    }

    async getBooksQuery(filters: ISearchFilters, title: string) {

        const conditions = [];
        if (filters.title) conditions.push(`title ILIKE '%${filters.title}%'`);
        if (filters.pageCount) conditions.push(`pagecount = '${filters.pageCount}'`);
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
        if (conditions.length) query += ` WHERE ${conditions.join(' AND ')}`;
        const result = await this.client().query(query);
        return result.rows;
    }

    /* UPDATE */
    async updateField(options: QueryOptions, id: string[], valueId: number[]) {
        const { table, columns, values, constants } = options;
        const query = `UPDATE ${table} SET ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(',')} WHERE ${id} = $${valueId}`;
        const result = await this.client().query(query, constants);
        return result.rowCount;
    }
    async updateFieldV2(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `UPDATE ${table} SET ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(',')}`;
        const result = await this.client().query(query, constants);
        return result.rowCount;
    }

    async updateBook(table: string, column: string, value: number, email: string) {
        const query = `UPDATE ${table} SET ${column}[${value}]= NULL::json WHERE u_email = '${email}'`;
        await this.client().query(query);
    } // UPDATE public.users SET u_books_readed[2] = NULL::json WHERE id_u = 2;
    


    /* DELETE */
    async deleteField(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `DELETE FROM ${table} WHERE ${columns} = $${values}`;
        const result = await this.client().query(query, constants);
        return result.rowCount;
    }

    static create() {
        return new PostgreSQLRepository()
    }
}