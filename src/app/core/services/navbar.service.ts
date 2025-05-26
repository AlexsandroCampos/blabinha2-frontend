import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavbarService {
    private avatarSource = new BehaviorSubject<number>( Number(localStorage.getItem('selectedAvatar')) || 0);
    currentAvatar = this.avatarSource.asObservable();

  setData(avatar: number) {
    this.avatarSource.next(avatar);
  }
}