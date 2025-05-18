import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}
  email: string = '';
  password: string = '';

  onLoginSubmit(): void {
    const credentials = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:8070/api/login', credentials).subscribe({next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home-logged']);
          } else {
            console.error('Error: Token no encontrado en la respuesta');
            alert('Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error('Error de autenticación:', err);
          alert('Credenciales incorrectas');
        },
      });

  }
}
