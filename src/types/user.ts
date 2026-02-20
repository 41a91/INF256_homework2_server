export interface User {
  id: number;
  name: string;
  password: Buffer;
  created_at: string;
  updated_at: string;
}

export interface ClientSafeUser {
  id: number;
  name: string;
}
