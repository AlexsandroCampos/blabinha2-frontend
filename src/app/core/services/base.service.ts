import { HttpHeaders } from '@angular/common/http';

export class BaseService {

  getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('apiKey') || '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
