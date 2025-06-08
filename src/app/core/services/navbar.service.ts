import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavbarService {
    private avatarSource = new BehaviorSubject<number>( Number(localStorage.getItem('selectedAvatar')) || 0);
    currentAvatar = this.avatarSource.asObservable();

    private stepsource = new BehaviorSubject<number>(Number(localStorage.getItem('step')) || 0);
    currentstep = this.stepsource.asObservable();

  setData(avatar: number) {
    this.avatarSource.next(avatar);
  }

  setData2(step: number) {
    this.stepsource.next(step);
  }
}