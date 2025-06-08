import { ChatPublic } from "./chat.model";

export interface DialogPublicWithChat {
    id: string;
    answer: string;
    input: string;
    section: number;
    tokens: number;
    created_at: string;
    chat: ChatPublic;
}

export interface DialogPublic {
    id: string;
    answer: string;
    input: string;
    section: number;
    tokens: number;
    created_at: string;
}

export class DialogPublic2 {
    id: string;
    answer: string;
    input: string;
    section: number;
    tokens: number;
    created_at: string;

    constructor(id: string, answer: string, input: string, section: number, tokens: number, created:string) {
      this.answer = answer;
      this.created_at = created;
      this.id = id;
      this.input = input;
      this.section = section;
      this.tokens = tokens;
    }
}

export class DialogCreate {
    chat_id: string;
    input: string;

    constructor(
    chat_id: string,
    input: string,
  ) {
    this.chat_id = chat_id;
    this.input = input;
  }
}