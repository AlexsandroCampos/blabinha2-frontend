import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';
import { NavbarService } from '../../core/services/navbar.service';

@Component({
  selector: 'app-tips-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './tips-modal.component.html',
  styleUrl: './tips-modal.component.css'
})
export class TipsModalComponent {
  modalOpen = false
  selectedSuggestion: number = -1
  suggestions: string[] = []
  loading = false;

  constructor(
    private chatService: ChatService,
    private navbarService: NavbarService
  ) {  }

  openModal() {
    this.modalOpen = true;
    this.loading = true;
    var chatid = localStorage.getItem('chatId') || ""
    this.chatService.getSuggetionsByChatId(chatid)
    .subscribe({
        next: suggestions => {
          this.suggestions = suggestions
          this.loading = false;
        },
    });
  }

  closeModal() {
    this.modalOpen = false;
    this.suggestions = [];
    this.selectedSuggestion = -1;
  }

  sendMessage() {
    if (this.selectedSuggestion >= 0 && this.selectedSuggestion < this.suggestions.length) {
      const sugestao = this.suggestions[this.selectedSuggestion];
      this.navbarService.callChatFunction(sugestao);
      this.closeModal()
    }
  }
}
