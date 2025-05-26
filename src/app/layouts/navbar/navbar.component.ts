import { Component, ViewChild } from '@angular/core';
import { TipsModalComponent } from "../../shared/tips-modal/tips-modal.component";
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../core/services/navbar.service';

@Component({
  selector: 'app-navbar',
  imports: [TipsModalComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild(TipsModalComponent) modalComponent!: TipsModalComponent;
  step = Number(localStorage.getItem('step')) || 0
  selectedAvatar: number = 0

  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
  this.navbarService.currentAvatar.subscribe(avatar => {
    this.selectedAvatar = avatar;
  });
}

  openModal() {
    this.modalComponent.openModal();
  }

}
