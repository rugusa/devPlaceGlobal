import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {}

  onRegister() {
    // Aquí iría la lógica para registrar al usuario
    console.log('Formulario de registro enviado');

    // Redirigir al usuario al login una vez se registre con éxito
    this.router.navigate(['/login']);
  }
}
