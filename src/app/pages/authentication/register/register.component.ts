import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { UserCreatePayload } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  alerts: string[] = [];
  typeOfError: Number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  submitRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.typeOfError = 1;
      this.showAlert("Preencha todos os campos.");
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.typeOfError = 1;
      this.showAlert("Digite um e-mail válido.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.typeOfError = 1;
      this.showAlert("As senhas não coincidem.");
      return;
    }

    this.userService.postUser(new UserCreatePayload(
      this.email, this.password, this.password
    )).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.typeOfError = 2;
        this.showAlert("Erro ao registrar usuário. Tente novamente.");
      }
    })
  }

  showAlert(message: string) {
    this.alerts.push(message);
    setTimeout(() => this.alerts = [], 3000);
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

}
