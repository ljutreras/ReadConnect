import { Pool } from "pg";
import { QueryOptions } from "../interface/QueryOptions"
import { IBooks } from "../interface/IBooks";

export class PostgreSQLRepository {
    constructor() { }

    client() {
        const client = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'read_connect',
            password: '4wwlvaeU.1',
            port: 5432,
        });
        return client
    }

    async insert(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${values.map((_, i) => `$${i + 1}`).join(',')})`;
        await this.client().query(query, constants);
    }

    async getManyFields(options: QueryOptions) {
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

    async updateField(options: QueryOptions, id: string[], valueId: number[]) {
        const { table, columns, values, constants } = options;
        const query = `UPDATE ${table} SET ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(',')} WHERE ${id} = $${valueId}`;
        const result = await this.client().query(query, constants);
        return result.rowCount;
    }

    async deleteField(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `DELETE FROM ${table} WHERE ${columns} = $${values}`;
        const result = await this.client().query(query, constants);
        return result.rowCount;
    }

    insertBookQuery(table: string, book: IBooks[]): string {

        const params = Object.keys(book);
        const values = Object.values(book).map((val, i) => `$${i + 1}`);
        const query = `INSERT INTO ${table} (${params.join(', ')}) VALUES (${values.join(', ')});`;
        return query;

    }

    static create() {
        return new PostgreSQLRepository()
    }
}