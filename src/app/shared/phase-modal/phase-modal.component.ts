import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ChatService } from '../../core/services/chat.service';
import { ChatCreate } from '../../core/models/chat.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-phase-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './phase-modal.component.html',
  styleUrl: './phase-modal.component.css'
})
export class PhaseModalComponent {
  modalOpen = false;
  modalAnswered = false
  currentStep = 0;
  selectedAvatar: Number = -1
  selectedModel: string = "none"
  selectedEngineering: string = "none"
  apiKey: string = ""
  alerts: string[] = []

  constructor(private chatService: ChatService) {  }

  openModal(info: boolean) {
    this.modalAnswered = Boolean(localStorage.getItem('modalAnswered'))
    if(info) {
      this.currentStep = 2
      this.modalOpen = true
    } 
    else if (!this.modalAnswered)
      this.modalOpen = true
  }

  closeModal() {
    this.modalOpen = false
  }

  next() {
    this.currentStep++
  }

  prev() {
    this.currentStep--
  }

  submitModal() {
    if(this.validateForm())
      return
    
    localStorage.setItem('modalAnswered', 'true')
    localStorage.setItem('apiKey', this.apiKey)
    this.chatService.postChat(new ChatCreate(this.selectedModel, this.selectedEngineering, 100))
      .pipe(first())
      .subscribe({
        next: chat => {
          localStorage.setItem('chatId', chat.id.toString())
          console.log(chat)
        },
        // error: error => this.handleError(error)
      });
    
    this.closeModal()
  }

  validateForm(): boolean {
    var error = false
    if (this.selectedAvatar == -1) {
      this.showAlert('Selecione um avatar')
      error = true
    }

    if (this.selectedModel == 'none') {
      this.showAlert('Selecione um modelo de linguagem')
      error = true
    }

    if (this.apiKey == '') {
      this.showAlert('Digite uma chave de API')
      error = true
    }

    if (this.selectedEngineering == 'none') {
      this.showAlert('Selecione uma engenharia de prompt')
      error = true
    }
    return error
  }

  showAlert(message: string) {
    this.alerts.push(message);
    setTimeout(() => {
      this.alerts = []
    }, 3000);
  }
}
