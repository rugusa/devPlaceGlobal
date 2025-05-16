import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-myscripts',
  templateUrl: './myscripts.component.html',
  styleUrls: ['./myscripts.component.css'],
  standalone: true,
})
export class MyscriptsComponent implements OnInit {
  scripts: any[] = [];
  errorMessage = '';
  loading = true;

  constructor(private scriptService: ScriptService) {}

  ngOnInit(): void {
        console.log('⏳ Lanzando getMyScripts…');

    this.scriptService.getMyScripts().subscribe({
      next: res => {
       console.log('✅ getMyScripts respondió URL:', this.scriptService['apiUrl'] + '/my/scripts');

        this.scripts = res.data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'No se han podido cargar tus scripts.';
        this.loading = false;
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
}
