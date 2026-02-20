export type MESSAGE_TYPE = "TEXT" | "IMAGE";

export interface Chat {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMember {
  id: number;
  user_id: number;
  chat_id: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: number;
  chat_id: number;
  user_id: number;
  message_type: MESSAGE_TYPE;
  message: string;
  created_at: string;
  updated_at: string;
}
