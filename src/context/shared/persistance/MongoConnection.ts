import config from '@app/config/Index'
import { MongoClient } from "mongodb";

export class MongoConnection {
    constructor () {}

    connect = async () => {
        const client = new MongoClient(config.MONGO_URL);
        try {
            await client.connect()
            console.log('Connection Success')
        } catch (e) {
            console.error(e)
        } finally {
            await client.close()
        }
    }

    static create() {
        return new MongoConnection().connect()
    }
}
