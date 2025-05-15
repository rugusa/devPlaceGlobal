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
  // onLoginSubmit(): void {
  //   const credentials = { email: this.email, password: this.password };

  //   this.http.post<any>('http://localhost:8070/api/login_check', credentials).subscribe({
  //     next: (response) => {
  //       console.log('Respuesta del servidor:', response);
  //       if (response && response.id) {
  //         this.authService.setUserId(response.id);
  //         console.log('Usuario autenticado:', response);
  //         this.router.navigate(['/home']);
  //       } else {
  //         console.error('Error: No se encontró el ID del usuario en la respuesta');
  //         alert('Credenciales incorrectas');
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error de autenticación:', err);
  //       alert('Credenciales incorrectas');
  //     }
  //   });
  // }

  onLoginSubmit(): void {
    const credentials = { email: this.email, password: this.password };

    this.http
      .post<any>('http://localhost:8070/api/login', credentials)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);

          if (response && response.token) {
            // Guarda el token en localStorage
            localStorage.setItem('token', response.token);

            // Redirige al home
            this.router.navigate(['/']);
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

    //   this.http
    //     .post<{ token: string }>('http://localhost:8070/api/login', credentials, {
    //       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //     })
    //     .subscribe((response) => {
    //       if (response.token) {
    //         localStorage.setItem('token', response.token);
    //         this.router.navigate(['/']);
    //       } else {
    //         alert('Credenciales incorrectas');
    //       }
    //     });
    // }
  }
}
