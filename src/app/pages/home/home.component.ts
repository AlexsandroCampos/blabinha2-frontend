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

  ngOnInit(): void {
    var step = localStorage.getItem('step') 
    if(step == null)
      localStorage.setItem('step', "0");
    if(Number(step) == 1)
      this.router.navigate(['/chat'])
    if(Number(step) == 2)
      this.router.navigate(['/results'])
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.modalComponent.openModal())
  }

  sendMessage(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    console.log(textarea)

    if (!textarea) return

    const rawMessage = textarea.value.trim();
    textarea.value = "";

    if (!rawMessage || rawMessage.replace(/\s/g, '') === '')
      return

    localStorage.setItem('step', "1");
    this.router.navigate(['/chat'])

    }
}
