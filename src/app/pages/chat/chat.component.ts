import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../core/services/chat.service';
import { DialogCreate, DialogPublic, DialogPublic2 } from '../../core/models/dialog.model';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../core/services/dialog.service';
import { first } from 'rxjs';
import { PhaseModalComponent } from '../../shared/phase-modal/phase-modal.component';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, PhaseModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input() mensagensMaxHeight: String = ''
  @ViewChild(PhaseModalComponent) modalComponent!: PhaseModalComponent
  dialogs: DialogPublic[] = []
  alerts: string[] = []
  typeOfError: number = 0
  stars: number = 0
  selectedAvatar: number = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get('id') || ""
    this.selectedAvatar = Number(localStorage.getItem('selectedAvatar'))
    // this.chatService.getDialogsByChatId(chatId).subscribe(dialogs => {
    //   this.dialogs = dialogs
    //   console.log(dialogs)
    // })

    //ou isto:
    this.chatService.getChatById(chatId).subscribe(chat => {
      this.dialogs = chat.dialogs
      console.log(this.dialogs)
    })
  }

  sendMessage(): void {

    var textarea = document.getElementById("textarea") as HTMLTextAreaElement

    if (!textarea) return

    const rawMessage = textarea.value.trim();

    if (!rawMessage || rawMessage.replace(/\s/g, '') === '')
      return

    var id = localStorage.getItem("chatId") || ""

    textarea.value = "";

    this.dialogs.push(new DialogPublic2("", "", rawMessage, 0, 0, ""));

    this.dialogService.postDialog(new DialogCreate(id, rawMessage))
      .pipe(first())
      .subscribe({
        next: dialog => {
          this.dialogs[this.dialogs.length-1] = dialog
          console.log(dialog)
        },
        error: error => this.handleError(error)
    });

    this.scrollToBottom()
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.querySelector('#chat')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }, 100);
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

  cleanMessage(message: string): string {
    if (!message) {
      return ''
    }
 
    return message.replace(/^\|\|/, '');
  } 
}
