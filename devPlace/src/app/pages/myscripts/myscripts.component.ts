import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.service';
import {  Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myscripts',
  imports: [CommonModule],
  templateUrl: './myscripts.component.html',
  styleUrls: ['./myscripts.component.css'],
  standalone: true,
})
export class MyscriptsComponent implements OnInit {
  scripts: any[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(private scriptService: ScriptService,private router: Router) {}

  ngOnInit(): void {
    this.scriptService.getMyScripts().subscribe({
      next: res => {
        this.scripts = res.data;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'No se han podido cargar tus scripts.';
        this.isLoading = false;
      }
    });
  }

  descargarScript(id: number, title: string) {
    this.scriptService.downloadScript(id).subscribe({
      next: blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `${title}.zip`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: err => {
        console.error('Error al descargar:', err);
        alert('No se pudo descargar el script.');
      }
    });
  }
  onEditScript(id: number) {
    this.router.navigate(['/script-edit', id]);
  }

  onDeleteScript(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este script?')) {
      return;
    }
    this.scriptService.deleteScript(id).subscribe({
      next: () => {
        this.scripts = this.scripts.filter(s => s.id !== id);
      },
      error: err => {
        console.error('Error al eliminar:', err);
        alert('No se pudo eliminar el script.');
      }
    });
  }

}
