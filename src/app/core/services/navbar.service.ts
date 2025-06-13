import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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

  private triggerChatFunction = new Subject<string>();
  triggerChatFunction$ = this.triggerChatFunction.asObservable();

  private playagainSource = new BehaviorSubject<boolean>(false);
  currentPlayagain = this.playagainSource.asObservable();

  callChatFunction(suggestion: string) {
    this.triggerChatFunction.next(suggestion);
  }
  
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

  setPlayAgain(playAgain: boolean) {
    this.playagainSource.next(playAgain);
  }
}