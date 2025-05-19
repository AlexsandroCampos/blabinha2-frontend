import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChatComponent } from "../chat/chat.component";
import { CommonModule } from '@angular/common';
import { PhaseModalComponent } from "../../shared/phase-modal/phase-modal.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, PhaseModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild(PhaseModalComponent) modalComponent!: PhaseModalComponent

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.modalComponent.openModal(false))
  }

  sendMessage(): void {
    var textarea = document.getElementById("textarea") as HTMLTextAreaElement

    if (!textarea) return

    const rawMessage = textarea.value.trim();

    if (!rawMessage || rawMessage.replace(/\s/g, '') === '')
      return

    textarea.value = "";

    localStorage.setItem('step', "1");
    this.router.navigate(['/chat'])
  }
}
