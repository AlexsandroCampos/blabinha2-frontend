import { ChatPublic } from "./chat.model"; // Importa o modelo ChatPublic já existente

export class UserCreatePayload {
  subscribe(arg0: { next: (response: any) => void; error: (error: any) => void; }): UserCreatePayload {
    throw new Error('Method not implemented.');
  }
  email: string;
  password: string;
  confirm_password: string;

  constructor(email: string, password: string, confirm_password: string) {
    this.email = email;
    this.password = password;
    this.confirm_password = confirm_password;
  }
}

export interface UserPublic {
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserPublicWithChats extends UserPublic {
  chats: ChatPublic[];
}
