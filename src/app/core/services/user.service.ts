import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserCreatePayload, UserPublic, UserPublicWithChats } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {
  }

  postUser(userCreate: UserCreatePayload): Observable<UserPublicWithChats> {
    return this.httpClient.post<UserPublicWithChats>(`${this.baseUrl}/register`, userCreate);
  }
}
