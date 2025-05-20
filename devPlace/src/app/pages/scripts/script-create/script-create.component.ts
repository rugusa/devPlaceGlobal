import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../../services/script.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-script-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './script-create.component.html',
  styleUrls: ['./script-create.component.css'],
})
export class ScriptCreateComponent {
  title = '';
  description = '';
  price = 0;
  createdAt = new Date().toISOString().slice(0, 19);
  selectedFile: File | null = null;
  isLoading = false;
  constructor(
    private scriptService: ScriptService,
    private authService: AuthService,
    private router: Router
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      return alert('Debes seleccionar un fichero .zip con tu app/script.');
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('created_at', this.createdAt);
    formData.append('file', this.selectedFile);
    this.isLoading = true;
    this.scriptService.createScript(formData).subscribe({
      next: (resp) => {
        this.isLoading = false;
        console.log('Script creado:', resp);
        alert('¡Script creado con éxito!');
        this.router.navigate(['/myscripts']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert('Error al crear el script.');
      },
    });
  }
}
