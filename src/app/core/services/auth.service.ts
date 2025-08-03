import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginPayload, Token } from '../models/token.model';
import { Observable } from 'rxjs';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private baseUrl = `${environment.apiUrl}/auth`;
  
  constructor(private httpClient: HttpClient, private navbarService: NavbarService, private router: Router) {
  }

  postToken(loginPayload: LoginPayload): Observable<Token> {
    const body = new HttpParams()
      .set('username', loginPayload.username)
      .set('password', loginPayload.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.httpClient.post<Token>(
      `${this.baseUrl}/token`,
      body.toString(), // importante!
      { headers }
    );
  }

  refreshToken(): Observable<Token> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const payload = { refresh_token: refreshToken };
    return this.httpClient.post<Token>(`${this.baseUrl}/refresh`, payload);
  }

  logout() {
    localStorage.clear();
    this.navbarService.setAvatar(0);
    this.navbarService.setStep(0);
    this.navbarService.setBonus(0);
    this.navbarService.setSection(100);
    this.navbarService.setTitleVisibility(false);
    this.router.navigate(['/login']);
  }

}
