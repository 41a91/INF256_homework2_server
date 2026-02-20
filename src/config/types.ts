import type { Secret } from "jsonwebtoken";

export default interface Config {
  server: Server;
  database: Database;
  passwords: Passwords;
  jwt: JsonWebToken;
  logging: Logging;
}

interface Server {
  host: string;
  port: number;
}

interface Database {
  host: string;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
}

interface Passwords {
  salt: number;
  strength: {
    size: number;
  };
}

interface JsonWebToken {
  secret: Secret;
  expiresIn: number;
}

interface Logging {
  levels: Record<string, number>;
  colors: Record<string, string>;
  level: string;
  silent: boolean;
}
