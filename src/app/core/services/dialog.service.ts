import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DialogCreate, DialogPublicWithChat } from '../models/dialog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private baseUrl = `${environment.apiUrl}/dialogs`;

  constructor(private httpClient: HttpClient) {
  }

  postDialog(dialogCreate: DialogCreate): Observable<DialogPublicWithChat> {
    return this.httpClient.post<DialogPublicWithChat>(`${this.baseUrl}`, dialogCreate);
  }

  getDialog(dialogId: number): Observable<DialogPublicWithChat> {
    return this.httpClient.get<DialogPublicWithChat>(`${this.baseUrl}/${dialogId}`);
  }
}
