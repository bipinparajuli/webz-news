import { Pool } from "pg";
import { config } from "../config/config";

export const db = new Pool({
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});
