import { DialogPublic } from "./dialog.model";

export interface ChatPublicWithDialogs {
    id: string;
    model: string;
    strategy: string;
    state: ChatState;
    bonusQnt: number;
    stars: number;
    repetition: number;
    heroFeatures: boolean;
    totalTokens: number;
    created_at: string;
    updated_at: string;
    dialogs: DialogPublic[];
    username: string;
    current_section: number;
    image: string;
}

export interface ChatPublic {
    id: string;
    model: string;
    strategy: string;
    state: ChatState;
    bonusQnt: number;
    stars: number;
    repetition: number;
    heroFeatures: boolean;
    totalTokens: number;
    created_at: string;
    updated_at: string;
    username: string;
    current_section: number;
}

export class ChatCreate {
    model: string;
    strategy: string;
    initial_section: number;

    constructor(
    model: string,
    strategy: string,
    initial_section: number,
  ) {
    this.model = model;
    this.strategy = strategy;
    this.initial_section = initial_section;
  }
}

export enum ChatState {
  OPEN = 'open',
  CLOSED = 'closed',
}