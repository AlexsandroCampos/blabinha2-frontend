import { Component } from '@angular/core';
import { ChatComponent } from "../chat/chat.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ChatComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
