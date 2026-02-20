import mysql from "mysql2/promise";
import config from "../config/config.js";

export default mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: ,
  database: config.database.database,
  waitForConnections: true,
  connectionLimit: config.database.connectionLimit,
});
