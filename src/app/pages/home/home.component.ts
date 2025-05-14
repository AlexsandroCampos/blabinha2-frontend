import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChatComponent } from "../chat/chat.component";
import { CommonModule } from '@angular/common';
import { PhaseModalComponent } from "../../shared/phase-modal/phase-modal.component";

@Component({
  selector: 'app-home',
  imports: [ChatComponent, CommonModule, PhaseModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild(PhaseModalComponent) modalComponent!: PhaseModalComponent;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.modalComponent.openModal());
  }

  openModal() {
    this.modalComponent.openModal();
  }

}
