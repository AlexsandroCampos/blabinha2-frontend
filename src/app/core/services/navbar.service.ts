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

  private starsource = new BehaviorSubject<number>(0);
  currentStars = this.starsource.asObservable();

  private sectionsource = new BehaviorSubject<number>(100);
  currentSection = this.sectionsource.asObservable();

  private bonussource = new BehaviorSubject<number>(0);
  currentbonus = this.bonussource.asObservable();

  setAvatar(avatar: number) {
    this.avatarSource.next(avatar);
  }

  setStep(step: number) {
    this.stepsource.next(step);
  }

  setStar(star: number) {
    this.starsource.next(star);
  }

  setSection(section: number) {
    this.sectionsource.next(section);
  }

  setBonus(bonus: number) {
    this.bonussource.next(bonus);
  }
}