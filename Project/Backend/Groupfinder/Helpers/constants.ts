export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD   = process.env.DB_PASSWORD;
export const JWT_SECRET    = process.env.JWT_SECRET;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
export const NON_AUTH_PATHS    = ["/auth/login", "/auth/register", "/auth/expiry"];
export const JWT_TOKEN_EXPIRY  = process.env.JWT_TOKEN_EXPIRY;
export const STATIC_SALT = process.env.STATIC_SALT