import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  alerts: string[] = [];
  typeOfError: Number = 0;

  constructor(
    private router: Router,
  ) {}

  submitRegister() {
    if (!this.email || !this.password) {
      this.typeOfError = 1;
      this.showAlert("Preencha todos os campos.");
      return;
    }

    console.log('Registrando com:', this.email, this.password);
    // Aqui você pode chamar um AuthService para cadastro

    this.router.navigate(['/login']);
  }

  showAlert(message: string) {
    this.alerts.push(message);
    setTimeout(() => this.alerts = [], 3000);
  }

}
