import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ChatCreate, ChatPublicWithDialogs } from '../models/chat.model';
import { DialogPublic } from '../models/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {
 private baseUrl = `${environment.apiUrl}/chats`;

  constructor(private httpClient: HttpClient) {
    super()
  }

  postChat(chatCreate: ChatCreate): Observable<ChatPublicWithDialogs> {
    return this.httpClient.post<ChatPublicWithDialogs>(`${this.baseUrl}`, chatCreate, this.getHttpOptions());
  }

  getDialogsByChatId(chatId: number): Observable<DialogPublic[]> {
    return this.httpClient.get<DialogPublic[]>(`${this.baseUrl}/${chatId}/dialogs`, this.getHttpOptions());
  }

  getChatById(chatId: string): Observable<ChatPublicWithDialogs> {
    return this.httpClient.get<ChatPublicWithDialogs>(`${this.baseUrl}/${chatId}`, this.getHttpOptions());
  }

  getSuggetionsByChatId(chatId: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/${chatId}/suggestions`, this.getHttpOptions());
  }
}
