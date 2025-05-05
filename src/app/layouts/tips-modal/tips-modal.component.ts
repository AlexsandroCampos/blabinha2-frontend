import { Component } from '@angular/core';

@Component({
  selector: 'app-tips-modal',
  imports: [],
  templateUrl: './tips-modal.component.html',
  styleUrl: './tips-modal.component.css'
})
export class TipsModalComponent {
  modalOpen = false;

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
