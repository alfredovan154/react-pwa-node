import * as dotenv from "dotenv";
dotenv.config();

const env = {
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_CRYPTO: process.env.SECRET_CRYPTO,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASS: process.env.EMAIL_PASS,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default env;