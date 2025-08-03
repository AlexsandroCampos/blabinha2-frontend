import { Component, ViewChild } from '@angular/core';
import { TipsModalComponent } from "../../shared/tips-modal/tips-modal.component";
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../core/services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [TipsModalComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild(TipsModalComponent) modalComponent!: TipsModalComponent;
  step = 0
  selectedAvatar: number = 0
  stars: number = 0
  bonus:number = 0
  section: number = 0
  isTitleHidden: boolean = false;

  constructor(private navbarService: NavbarService, private router: Router) {}

  ngOnInit() {
    this.navbarService.currentAvatar.subscribe(avatar => {
      this.selectedAvatar = avatar;
    });
    this.navbarService.currentstep.subscribe(step => {
      this.step = step;
    });
    this.navbarService.currentStars.subscribe(stars => {
      this.stars = stars;
    });
    this.navbarService.currentbonus.subscribe(bonus => {
      this.bonus = bonus;
    });
    this.navbarService.currentSection.subscribe(section => {
      this.section = section;
    });
    this.navbarService.currentTitle.subscribe(title => {
      this.isTitleHidden = title;
    });
  }

  openModal() {
    this.modalComponent.openModal();
  }

  logout() {
    localStorage.clear();
    this.navbarService.setAvatar(0);
    this.navbarService.setStep(0);
    this.navbarService.setBonus(0);
    this.navbarService.setSection(100);
    this.navbarService.setTitleVisibility(false);
    this.router.navigate(['/login']);
  }

}
