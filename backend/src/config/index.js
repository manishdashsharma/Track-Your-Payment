import dotenv from 'dotenv';

dotenv.config()

const config = {
    PORT : process.env.PORT || 9000,
    IP: process.env.IP,
    MONGO_DB_URI : process.env.MONGO_DB_URI,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    JWT_SECRET : process.env.JWT_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY : process.env.REFRESH_TOKEN_EXPIRY
}

export default config