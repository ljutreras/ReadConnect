import { Client } from 'pg';

export class PostgreSQL {
    constructor() { }

    connect = async () => {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'read_connect',
            password: '4wwlvaeU.1',
            port: 5432,
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
