import { Sequelize } from "sequelize";
import env from "./env";
import { logger } from "../middleware/logger";

const sequalize = new Sequelize({
  dialect: "mysql",
  database: env.DB_NAME,
  host: env.DB_HOST,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  logging: false
});

export default sequalize;
