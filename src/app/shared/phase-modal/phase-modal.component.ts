import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ChatService } from '../../core/services/chat.service';
import { ChatCreate } from '../../core/models/chat.model';
import { first } from 'rxjs';
import { NavbarService } from '../../core/services/navbar.service';

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
  selectedAvatar: number = 0
  selectedModel: string = "none"
  selectedEngineering: string = "none"
  apiKey: string = ""
  alerts: string[] = []
  typeOfError: number = 0


  constructor(
    private chatService: ChatService,
    private navbarService: NavbarService,
  ) {  }

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
    
    
    this.chatService.postChat(new ChatCreate(this.selectedModel, this.selectedEngineering, 100))
      .pipe(first())
      .subscribe({
        next: chat => {
          localStorage.setItem('chatId', chat.id.toString())
          console.log(chat)
          localStorage.setItem('modalAnswered', 'true')
          localStorage.setItem('selectedAvatar', this.selectedAvatar.toString())
          localStorage.setItem('apiKey', this.apiKey)
          this.navbarService.setData(this.selectedAvatar)
          this.closeModal()
        },
        error: error => this.handleError(error)
      });
  }

  validateForm(): boolean {
    var error = false
    if (this.selectedAvatar == 0) {
      this.showAlert('Selecione um avatar')
      error = true
      this.typeOfError = 1
    }

    if (this.selectedModel == 'none') {
      this.showAlert('Selecione um modelo de linguagem')
      error = true
      this.typeOfError = 1
    }

    if (this.apiKey == '') {
      this.showAlert('Digite uma chave de API')
      error = true
      this.typeOfError = 1
    }

    if (this.selectedEngineering == 'none') {
      this.showAlert('Selecione uma engenharia de prompt')
      error = true
      this.typeOfError = 1
    }
    return error
  }

  showAlert(message: string) {
    this.alerts.push(message);
    setTimeout(() => {
      this.alerts = []
    }, 3000);
  }

  handleError(error: any) {
    this.typeOfError = 2
    console.log(error)
    this.showAlert("Ocorreu um erro. Tente novamente mais tarde")
  }
}
