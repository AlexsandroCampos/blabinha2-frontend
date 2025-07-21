import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaseModalComponent } from "../../shared/phase-modal/phase-modal.component";
import { Router } from '@angular/router';
import { DialogService } from '../../core/services/dialog.service';
import { first } from 'rxjs';
import { NavbarService } from '../../core/services/navbar.service';
import { DialogCreate } from '../../core/models/dialog.model';
import { ChatService } from '../../core/services/chat.service';
import { ChatCreate } from '../../core/models/chat.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PhaseModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild(PhaseModalComponent) modalComponent!: PhaseModalComponent
  alerts: string[] = []
  typeOfError: number = 0

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private navbarService: NavbarService,
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = history.state as {
      myData?: {
        model: string;
        selectedEngineering: string;
      };
    };
    if(state?.myData) {
      const model = state.myData.model;
      const selectedEngineering = state.myData.selectedEngineering;
      this.chatService.postChat(new ChatCreate(model, selectedEngineering, 100))
      .pipe(first())
      .subscribe({
        next: chat => {
          localStorage.setItem('chatId', chat.id.toString())
        },
        error: error => this.handleError(error)
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.modalComponent.openModal(false))
  }
  

  sendMessage(str: string): void {
    var rawMessage = ''
    if(str.trim() === '') {
      var textarea = document.getElementById("textarea") as HTMLTextAreaElement

      if (!textarea) return

      rawMessage = textarea.value.trim();

      if (!rawMessage || rawMessage.replace(/\s/g, '') === '')
        return

      textarea.value = "";
    }

    else 
      rawMessage = str
    
    var id = localStorage.getItem("chatId") || ""

    this.navbarService.setStep(1)
    localStorage.setItem('step', "1");
    this.navbarService.setMessage(rawMessage);
    this.router.navigate(['/chat', id]);
  }

  showAlert(message: string) {
    this.alerts.push(message);
    setTimeout(() => {
      this.alerts = []
    }, 6000);
  }

  handleError(error: any) {
    this.typeOfError = 2
    this.showAlert("Ocorreu um erro. Tente novamente mais tarde")
  }
}
