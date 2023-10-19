import { Pool } from "pg";

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tester',
    password: '4wwlvaeU.1',
    port: 5432,
})