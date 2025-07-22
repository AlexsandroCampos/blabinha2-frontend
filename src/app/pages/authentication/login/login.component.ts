import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  alerts: string[] = [];
  typeOfError: Number = 0;

  constructor(
    private router: Router,
  ) {}


  submitLogin() {
    if (!this.email || !this.password) {
      this.typeOfError = 1;
      this.showAlert("Preencha todos os campos.");
      return;
    }

    // Aqui você pode chamar um AuthService por exemplo
    console.log('Login com:', this.email, this.password);
    localStorage.setItem('token', 'fake-jwt-token');
    this.router.navigate(['/home']);

  }

  showAlert(message: string) {
    this.alerts.push(message);
    setTimeout(() => this.alerts = [], 3000);
  }

}
