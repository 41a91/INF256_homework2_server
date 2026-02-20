import winston from "winston";
import Config from "../config/config.js";

const logger = winston.createLogger({
  levels: Config.logging.levels,
  level: Config.logging.level,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
  silent: Config.logging.silent,
});

winston.addColors(Config.logging.colors);

export default logger;
