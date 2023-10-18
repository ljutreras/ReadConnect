import 'dotenv/config'

const env = (key: string) => {
    return process.env[key];
};

export default {
    PORT: env('PORT') ?? 3000,
    MONGO_URL: env('MONGO_URL') ?? 'mongodb://localhost:27017',
    DATABASE: env('DATABASE') ?? 'test',
    COLLECTION: env('COLLECTION') ?? 'ejemplos',
}