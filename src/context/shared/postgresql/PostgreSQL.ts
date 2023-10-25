import config from '../../../app/config/Index';
import { Client } from 'pg';

export class PostgreSQL {
    constructor() { }

    connect = async () => {
        const client = new Client({
            user: config.USER_DB,
            host: config.HOST_DB,
            database: config.DB,
            password: config.PASSWORD_DB,
            port: Number(config.PORT_DB),
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
