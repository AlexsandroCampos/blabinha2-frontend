import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input() mensagensMaxHeight: String = ''
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToBottom(), 0);
  }

  scrollToBottom(): void {
    if (!this.scrollContainer) return;
    const el = this.scrollContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  sendMessage(event: Event): void {
    localStorage.setItem('goToMessageComponent', 'true')
    // this.goToMessageComponent = true
    // this.router.navigate(['/chat'], { queryParams: { firstMessage: this.message } });
  }
}
