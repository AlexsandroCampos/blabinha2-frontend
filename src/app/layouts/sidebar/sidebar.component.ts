import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarService } from '../../core/services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  section: number = 0
  step = 0
  isTitleHidden: boolean = false;
  
  constructor(
    private navbarService: NavbarService,
    private router: Router,
  ) {}
  
  ngOnInit() {
    this.navbarService.currentSection.subscribe(section => {
      this.section = section;
    });

    this.navbarService.currentstep.subscribe(step => {
      this.step = step;
    });

    this.navbarService.currentTitle.subscribe(title => {
      this.isTitleHidden = title;
    });
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

  hideTitle() {
    this.navbarService.setTitleVisibility(!this.isTitleHidden);
  }
}
