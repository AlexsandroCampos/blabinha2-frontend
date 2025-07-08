import { Component, ElementRef, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../core/services/chat.service';
import { DialogCreate, DialogPublic, DialogPublic2, DialogPublicWithChat } from '../../core/models/dialog.model';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../core/services/dialog.service';
import { first } from 'rxjs';
import { PhaseModalComponent } from '../../shared/phase-modal/phase-modal.component';
import { NavbarService } from '../../core/services/navbar.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, PhaseModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewInit {
  @Input() mensagensMaxHeight: String = ''
  @ViewChild(PhaseModalComponent) modalComponent!: PhaseModalComponent
  dialogs: DialogPublic[] = []
  alerts: string[] = []
  typeOfError: number = 0
  stars: number = 0
  selectedAvatar: number = 0
  username: string = ""
  blocks: string[] = [];
  messageToSend: string | null = null;
  isSending = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private dialogService: DialogService,
    private navbarService: NavbarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.navbarService.currentMessage.subscribe(message => {
      if (message) {
       this.messageToSend = message;
        this.navbarService.clearMessage();
      }
    });

    this.navbarService.triggerChatFunction$.subscribe((suggestion: string) => {
      this.sendMessage(suggestion);
    });
    const chatId = this.route.snapshot.paramMap.get('id') || ""
    this.selectedAvatar = Number(localStorage.getItem('selectedAvatar'))
    this.chatService.getChatById(chatId).subscribe(chat => {
      this.dialogs = chat.dialogs
      this.username = chat.username
      this.navbarService.setStar(chat.stars)
      this.navbarService.setBonus(chat.bonusQnt)
      this.navbarService.setSection(chat.current_section)
      console.log(this.dialogs)
    })
  }

  ngAfterViewInit(): void {
    if (this.messageToSend) {
      setTimeout(() => {
        this.sendMessage(this.messageToSend!);
        this.messageToSend = null;
      }, 500);
    }
  }

  sendMessage(str: string): void {
    var rawMessage = ''
    var textarea = document.getElementById("textarea") as HTMLTextAreaElement
    if(str == '') {
      if (!textarea) return

      rawMessage = textarea.value.trim();

      if (!rawMessage || rawMessage.replace(/\s/g, '') === '')
        return

      textarea.value = "";
    }

    else 
      rawMessage = str

    // textarea.disabled = true;
    this.isSending = true;

    var id = localStorage.getItem("chatId") || ""

    // Adicionar o diálogo do usuário imediatamente para mostrar na tela
    const userDialog = new DialogPublic2("loading", "", rawMessage, 0, 0, "", 0);
    this.dialogs.push(userDialog);

    // Força a detecção de mudanças para atualizar a view
    this.cdr.detectChanges();
    setTimeout(() => {
      this.scrollToBottom();
    }, 50);

    this.dialogService.postDialog(new DialogCreate(id, rawMessage))
      .pipe(first())
      .subscribe({
        next: dialog => {
          // Substitui o diálogo temporário pelo real retornado do servidor
          this.isSending = false;
          this.dialogs[this.dialogs.length-1] = dialog
          this.username = dialog.chat.username
          this.navbarService.setStar(dialog.chat.stars)
          this.navbarService.setBonus(dialog.chat.bonusQnt)
          this.navbarService.setSection(dialog.section)
          setTimeout(() => {
            this.scrollToBottom()
          }, 100);
          this.handleEndOfGame(dialog)
          console.log(dialog)
        },
        error: error => {
          this.handleError(error);
        }
    });

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

  cleanMessage(message: string) {
    if (!message) {
      return
    }

    this.blocks = message.split('||').map(b => 
      b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    );
  }

  handleEndOfGame(dialog:DialogPublicWithChat) {
    if(dialog.section == 142 || (dialog.section >= 290 && dialog.section < 300) || 
      (dialog.section >= 370 && dialog.section < 380)) {
      this.isSending = true;
      setTimeout(() => {
        this.navbarService.setStep(2)
        localStorage.setItem('step', "2");
        this.router.navigate(['chat', dialog.chat.id, 'results']);
      }, 20000);
    }
  }
}
