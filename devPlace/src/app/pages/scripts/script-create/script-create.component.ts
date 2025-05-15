import { Component } from '@angular/core';
import { ScriptService } from '../../../services/script.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { JwtPayload } from '../../../interfaces/jwt-payload';
@Component({
  selector: 'app-script-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './script-create.component.html',
  styleUrl: './script-create.component.css',
})
export class ScriptCreateComponent {
  userId: number = 0;
  title: string = '';
  description: string = '';
  price: number = 0;
  selectedFile: File | null = null;
  createdAt = new Date().toISOString().slice(0, 19);

  constructor(
    private scriptService: ScriptService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.userId = user.id;
    } else {
      console.error('Usuario no autenticado');
    }
  }
  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //   }
  // }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Debes seleccionar un archivo.');
      return;
    }
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('user_id', (this.userId ?? 1).toString());
    formData.append('created_at', this.createdAt);
    formData.append('file', this.selectedFile);
    console.log('FormData enviado:', formData);

    const file = formData.get('file') as File;
    if (file) {
      console.log('Archivo:', file.name);
      console.log('Tamaño:', file.size); 
    }

    this.scriptService.createScript(formData).subscribe({
      next: (response) => {
        console.log('Script creado:', response);
      },
      error: (error) => {
        console.error('Error al crear el script:', error);
      },
    });
  }
}
