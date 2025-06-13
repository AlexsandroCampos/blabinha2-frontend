import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../core/services/chat.service';
import {ChatPublicWithDialogs } from '../../core/models/chat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-results',
  imports: [CommonModule],
  templateUrl: './game-results.component.html',
  styleUrl: './game-results.component.css'
})
export class GameResultsComponent {
  chat: ChatPublicWithDialogs | undefined
  typeOfEnding: number = 0
  start: string  = ""
  end: string = ""

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get('id') || ""
    this.chatService.getChatById(chatId).subscribe(chat => {
      this.chat = chat
      this.start = chat.dialogs[0].created_at
      this.end = chat.dialogs[chat.dialogs.length - 1].created_at
      console.log(chat)
      this.handleEndOfGame(chat)
    })
  }

  handleEndOfGame(chat: ChatPublicWithDialogs) {
    if(chat.current_section >= 370 && chat.current_section < 380) 
      this.typeOfEnding = 1
  }

  creatArray(num: number|undefined): number[] {
    return Array(num).fill(0);
  }

  getDurationString(): string {
    if(this.start == "" || this.end == "")
      return "00:00"
    const startTime = new Date(this.start);
    const endTime = new Date(this.end);

    const durationMs = endTime.getTime() - startTime.getTime();
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    return `${mm}:${ss}`;
  }
  

  playAgain(){
    localStorage.setItem("step", '0')
    this.router.navigate([''], {
      state: {
        myData: {
          model: this.chat?.model,
          selectedEngineering: this.chat?.strategy
        }
      }
    });
  }

  endGame(){
    localStorage.clear();
    this.router.navigate([''])
  }
}
