import type Config from "./types.js";

const config: Config = {
  server: {
    host: process.env.SERVER_HOST || "",
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 0,
  },
  database: {
    host: process.env.DATABASE_HOST || "",
    user: process.env.DATABASE_USER || "",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE || "",
    connectionLimit: process.env.DATABASE_CONNECTION_LIMIT
      ? parseInt(process.env.DATABASE_CONNECTION_LIMIT)
      : 0,
  },
  passwords: {
    salt: process.env.ENCRYPT_SALT ? parseInt(process.env.ENCRYPT_SALT) : 10,
    strength: {
      size: process.env.PASSWORD_STRENGTH_SIZE
        ? parseInt(process.env.PASSWORD_STRENGTH_SIZE)
        : 8,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "backupsecret",
    expiresIn: process.env.JWT_EXPIRES
      ? parseInt(process.env.JWT_EXPIRES)
      : 5000000000,
  },
  logging: {
    levels: {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7,
    },
    colors: {
      emerg: "strikethrough red",
      alert: "cyan",
      crit: "bold red",
      error: "red",
      warning: "yellow",
      notice: "magenta",
      info: "blue",
      debug: "green",
    },
    level: "debug",
    silent: false,
  },
};

export default config;
