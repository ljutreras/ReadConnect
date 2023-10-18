import config from '@app/config/Index'
import { MongoClient } from "mongodb";

export class MongoRepository {
    readonly database: string;
    readonly collection: string;

    constructor(database: string, collection: string) {
        this.database = database;
        this.collection = collection;
    }

    connectToDatabase () {
        const client = new MongoClient(config.MONGO_URL);
        const database = client.db(this.database);
        const collect = database.collection(this.collection);
        return collect
    }

    static create(database: string, collection: string) {
        return new MongoRepository(database, collection)
    }
}