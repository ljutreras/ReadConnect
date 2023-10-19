import { Pool } from "pg";
import {InsertOptions, QueryOptions} from "../interface/QueryOptions"

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

    async insert(options: InsertOptions) {
        const { table, columns, values, constants } = options;
        const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${values.join(',')})`;
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

    async updateField(options: QueryOptions, id:string[] , valueId: number[]) {
        const { table, columns, values, constants } = options;
        const query = `UPDATE ${table} SET ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(',')} WHERE ${id} = $${valueId}`;
        await this.client().query(query, constants);
    } //UPDATE course SET c_name=$1, c_description=$2 WHERE id_c=$3
    
    async deleteField(options: QueryOptions) {
        const { table, columns, values, constants } = options;
        const query = `DELETE FROM ${table} WHERE ${columns} = $${values}`;
        await this.client().query(query, constants);
    } //DELETE FROM course WHERE id_c=$1

    static create() {
        return new PostgreSQLRepository()
    }
}