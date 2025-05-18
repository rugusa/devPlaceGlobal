import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-script-edit',
  imports: [FormsModule],
  templateUrl: './script-edit.component.html',
  styleUrl: './script-edit.component.css',
  standalone: true,
})
export class ScriptEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private scriptService: ScriptService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.scriptService.getScriptById(this.id).subscribe({
      next: (res) => {
        const s = res.data;
        this.title = s.title;
        this.description = s.description;
        this.price = s.price;
        this.createdAt = s.created_at.slice(0, 16);
      },
      error: () => {
        alert('No se encontró el script');
        this.router.navigate(['/myscripts']);
      },
    });
  }
  id!: number;
  title = '';
  description = '';
  price = 0;
  createdAt = '';
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('created_at', this.createdAt);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
      console.log('🛠 formData entries:', [...formData.entries()]);

    this.scriptService.updateScript(this.id, formData).subscribe({
      next: () => {
        alert('Script actualizado');
        this.router.navigate(['/myscripts']);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('No se pudo actualizar');
      },
    });
  }
}
