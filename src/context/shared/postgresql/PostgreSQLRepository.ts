import { Pool } from "pg";

export class PostgreSQLRepository {
    constructor() { }

    client() {
        const client = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'tester',
            password: '4wwlvaeU.1',
            port: 5432,
        });
        return client
    }

    async insert(table: string, columns: string[], values: string[], constants: any[]) {
        const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${values.join(',')})`;
        await this.client().query(query, constants);
    }

    async getManyFields(table: string, columns: string[], values: number[], constants: any[]) {
        const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`).join(' AND ')}`;
        const res = await this.client().query(query, constants);
        return res.rows[0];
    }

    async getOneField(table: string, columns: string[], values: number[], constants: any[]) {
        const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`)}`;
        const res = await this.client().query(query, constants);
        return res.rows[0];
    }
    
    async getAllField(table: string, columns: string[], values: number[], constants: any[]) {
        const query = `SELECT * FROM ${table} WHERE ${columns.map((col, val) => `${col} = $${values[val].toString()}`)}`;
        const res = await this.client().query(query, constants);
        return res.rows;
    }

    async updateField(table: string, columns: string[], valuesColumn: number[], id:string[] , valueId: number[], constants: any[]) {
        const query = `UPDATE ${table} SET ${columns.map((col, val) => `${col} = $${valuesColumn[val].toString()}`).join(',')} WHERE ${id} = $${valueId}`;
        await this.client().query(query, constants);
    } //UPDATE course SET c_name=$1, c_description=$2 WHERE id_c=$3
    
    async deleteField(table: string, column:string[] , value: number[], constants: any[]) {
        const query = `DELETE FROM ${table} WHERE ${column} = $${value}`;
        await this.client().query(query, constants);
    } //DELETE FROM course WHERE id_c=$1

    static create() {
        return new PostgreSQLRepository()
    }
}