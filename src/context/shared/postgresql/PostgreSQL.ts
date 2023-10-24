import { Client } from 'pg';

export class PostgreSQL {
    constructor() { }

    connect = async () => {
        const client = new Client({
            user: 'kpqljntf',
            host: 'isabelle.db.elephantsql.com',
            database: 'kpqljntf',
            password: 'rXGVulkGCylJ1qqfKDxWNMty_52hbuIJ',
            port: 5432,
            ssl: true,
        });
        try {
            await client.connect()
            console.log('Connection with PostgreSQL Success')
            return client
        } catch (e) {
            console.error(e)
        }
    }

    static create() {
        return new PostgreSQL().connect()
    }
}
