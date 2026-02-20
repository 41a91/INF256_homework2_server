import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import pool from "../utils/database.js";
import type {
  Chat,
  ChatMember,
  MESSAGE_TYPE,
  ChatMessage,
} from "../types/chat.js";

export const createNewChat = async (name: string) => {
  const data = await pool.execute<ResultSetHeader>(
    "INSERT INTO chats(name) VALUES(?)",
    [name],
  );

  if (data[0].affectedRows > 0) {
    return data[0].insertId;
  } else {
    return null;
  }
};

export const addUserToChat = async (chatId: number, userId: number) => {
  const data = await pool.execute<ResultSetHeader>(
    "INSERT INTO chat_members(user_id,chat_id) VALUES(?,?)",
    [userId, chatId],
  );

  if (data[0].affectedRows > 0) {
    return data[0].insertId;
  } else {
    return null;
  }
};

export const addMessageToChat = async (
  chatId: number,
  userId: number,
  messageType: MESSAGE_TYPE,
  message: string,
) => {
  const data = await pool.execute<ResultSetHeader>(
    "INSERT INTO chat_messages(chat_id,user_id,message_type,message) VALUES(?,?,?,?)",
    [chatId, userId, messageType, message],
  );

  if (data[0].affectedRows > 0) {
    return data[0].insertId;
  } else {
    return null;
  }
};

export const getChatById = async (chatId: number) => {
  const data = await pool.execute<(Chat & RowDataPacket)[]>(
    "SELECT * FROM chats WHERE id=?",
    [chatId],
  );

  return data[0][0];
};

export const getChatsForUser = async (userId: number) => {
  const data = await pool.execute<(ChatMember & Chat & RowDataPacket)[]>(
    "SELECT * FROM chat_members JOIN chats ON chat_members.chat_id = chats.id WHERE chat_members.user_id = ?",
    [userId],
  );

  return data[0];
};

export const getMessagesForChat = async (chatId: number) => {
  const data = await pool.execute<(ChatMessage & RowDataPacket)[]>(
    "SELECT * FROM chat_messages WHERE chat_id=? ORDER BY updated_at ASC",
    [chatId],
  );

  return data[0];
};

Oops a typo;
