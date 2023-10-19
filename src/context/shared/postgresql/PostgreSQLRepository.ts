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

    async insert(params: string[], values: string[], constants: any[]) {
        const query = `INSERT INTO professor (${params.join(',')}) VALUES (${values.join(',')})`;
        await this.client().query(query, constants);
    }

    async getFields(columns: string[], values: string[], constants: any[]) {
        const query = `SELECT * FROM professor WHERE ${columns.map((col, val) => `${col} = ${values[val]}`).join(' AND ')}`;
        const res = await this.client().query(query, constants);
        return res.rows[0];
    }

    static create() {
        return new PostgreSQLRepository()
    }
}