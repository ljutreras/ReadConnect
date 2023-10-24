import 'dotenv/config'

const env = (key: string) => {
    return process.env[key];
};

export default {
    PORT: env('PORT') ?? 3000,
}