import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-results',
  imports: [],
  templateUrl: './game-results.component.html',
  styleUrl: './game-results.component.css'
})
export class GameResultsComponent {

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}
}
