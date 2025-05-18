import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router, private userService: UserService) {}
  errorMessage: string = '';
  successMessage: string = '';
  onRegister(form: NgForm) {
    if (form.invalid) return;

    const { username, email, password, confirmPassword } = form.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.userService.register({ email, username, password }).subscribe({
      next: (res) => {
        this.successMessage = 'Usuario registrado con éxito.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al registrar usuario.';
      },
    });
  }
}
