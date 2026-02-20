import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import pool from "../utils/database.js";
import type { ClientSafeUser, User } from "../types/user.js";
import { hashPassword } from "../utils/passwords.js";

export const getUserByName = async (name: string) => {
  const data = await pool.execute<(User & RowDataPacket)[]>(
    "SELECT * from users WHERE name=?",
    [name],
  );

  return data[0][0];
};

export const getUserById = async (userId: number) => {
  const data = await pool.execute<(User & RowDataPacket)[]>(
    "SELECT * from users WHERE id=?",
    [userId],
  );

  return data[0][0];
};

export const getOtherUsers = async (loggedInId: number) => {
  const data = await pool.execute<(ClientSafeUser & RowDataPacket)[]>(
    "SELECT id,name FROM users WHERE id != ?",
    [loggedInId],
  );

  return data[0];
};

export const registerUser = async (name: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  const data = await pool.execute<ResultSetHeader>(
    "INSERT INTO users(name,password) VALUES(?,?)",
    [name, hashedPassword],
  );

  if (data[0].affectedRows > 0) {
    return data[0].insertId;
  } else {
    return null;
  }
};
