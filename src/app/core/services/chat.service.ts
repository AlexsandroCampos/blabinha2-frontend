import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ChatCreate, ChatPublicWithDialogs } from '../models/chat.model';

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
}
