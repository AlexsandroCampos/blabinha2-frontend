import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginPayload } from '../../../core/models/token.model';

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
    private authService: AuthService,
  ) {}


  submitLogin() {
    if (!this.email || !this.password) {
      this.typeOfError = 1;
      this.showAlert("Preencha todos os campos.");
      return;
    }

    this.authService.postToken(new LoginPayload(this.email, this.password)).subscribe({
      next: (token) => {
        localStorage.setItem('access_token', token.access_token);
        localStorage.setItem('refresh_token', token.refresh_token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.typeOfError = 1;
          this.showAlert("Credenciais inválidas.");
        } else {
          this.typeOfError = 2;
          this.showAlert("Erro ao fazer login.");
        }
      }
    });
  }

  showAlert(message: string) {
    this.alerts.push(message);
    setTimeout(() => this.alerts = [], 3000);
  }

}
