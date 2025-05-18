import { ChatPublic } from "./chat.model";

export interface DialogPublicWithChat {
    id: number;
    answer: string;
    input: string;
    section: number;
    tokens: number;
    created_at: string;
    chat: ChatPublic;
}

export interface DialogPublic {
    id: number;
    answer: string;
    input: string;
    section: number;
    tokens: number;
    created_at: string;
}

export class DialogCreate {
    chat_id: number;
    input: string;

    constructor(
    chat_id: number,
    input: string,
  ) {
    this.chat_id = chat_id;
    this.input = input;
  }
}