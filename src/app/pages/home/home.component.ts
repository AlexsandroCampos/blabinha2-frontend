import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaseModalComponent } from "../../shared/phase-modal/phase-modal.component";
import { Router } from '@angular/router';
import { DialogService } from '../../core/services/dialog.service';
import { first } from 'rxjs';
import { NavbarService } from '../../core/services/navbar.service';
import { DialogCreate } from '../../core/models/dialog.model';

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
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.modalComponent.openModal(false))
  }
  

  sendMessage(str: string): void {
    var rawMessage = ''
    if(str == '') {
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

    this.dialogService.postDialog(new DialogCreate(id, rawMessage))
      .pipe(first())
      .subscribe({
        next: dialog => {
          this.navbarService.setData2(1)
          localStorage.setItem('step', "1");
          this.router.navigate(['/chat', id])
          console.log(dialog)
        },
        error: error => {
          this.handleError(error);
        } 
      });
  }

  showAlert(message: string) {
    this.alerts.push(message);
    setTimeout(() => {
      this.alerts = []
    }, 6000);
  }

  handleError(error: any) {
    this.typeOfError = 2
    console.log(error)
    this.showAlert("Ocorreu um erro. Tente novamente mais tarde")
  }
}
