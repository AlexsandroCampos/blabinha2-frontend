import { Component, ViewChild } from '@angular/core';
import { TipsModalComponent } from "../tips-modal/tips-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [TipsModalComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild(TipsModalComponent) modalComponent!: TipsModalComponent;

  openModal() {
    this.modalComponent.openModal();
  }

}
