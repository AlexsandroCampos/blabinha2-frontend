import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarService } from '../../core/services/navbar.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  section: number = 0
  
  constructor(private navbarService: NavbarService) {}
  
  ngOnInit() {
    this.navbarService.currentSection.subscribe(section => {
      this.section = section;
    });
  }

}
