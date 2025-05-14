import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-phase-modal',
  imports: [CommonModule],
  templateUrl: './phase-modal.component.html',
  styleUrl: './phase-modal.component.css'
})
export class PhaseModalComponent {
  modalOpen = false;
  currentStep = 0;

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  next() {
    this.currentStep++;
  }

  prev() {
    this.currentStep--;
  }
}
