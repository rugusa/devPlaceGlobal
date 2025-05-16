import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScriptService } from '../../../services/script.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-script-create',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './script-create.component.html',
  styleUrls: ['./script-create.component.css'],
})
export class ScriptCreateComponent {
  title = '';
  description = '';
  price = 0;
  createdAt = new Date().toISOString().slice(0, 19);
  selectedFile: File | null = null;

  constructor(
    private scriptService: ScriptService,
    private authService: AuthService
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      return alert('Debes seleccionar un archivo.');
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('created_at', this.createdAt);
    formData.append('file', this.selectedFile);

    this.scriptService.createScript(formData).subscribe({
      next: resp => {
        console.log('Script creado:', resp);
        alert('¡Script creado con éxito!');
      },
      error: err => {
        console.error(err);
        alert('Error al crear el script.');
      }
    });
  }
}
