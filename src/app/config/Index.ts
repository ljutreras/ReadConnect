import 'dotenv/config'

const env = (key: string) => {
    return process.env[key];
};

export default {
    PORT: env('PORT') ?? 3000,
    USER_DB: env('USER_DB'),
    HOST_DB: env('HOST_DB'),
    DB: env('DB'),
    PASSWORD_DB: env('PASSWORD_DB'),
    PORT_DB: env('PORT_DB'),
}