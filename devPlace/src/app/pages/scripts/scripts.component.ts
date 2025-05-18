import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Script } from '../../services/script.service';
import { ScriptService } from '../../services/script.service';
@Component({
  selector: 'app-scripts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css'],
})
export class ScriptsComponent implements OnInit {
  scripts: Script[] = [];
  errorMessage = '';

  constructor(private scriptService: ScriptService) {}

  ngOnInit(): void {
    this.scriptService.getScripts().subscribe({
      next: (res) => (this.scripts = res.data),
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar los scripts';
      },
    });
  }

  descargarScript(id: number, title: string) {
    this.scriptService.downloadScript(id).subscribe({
      next: (blob: Blob | MediaSource) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `${title}.zip`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => alert('No se pudo descargar el script.'),
    });
  }
}
