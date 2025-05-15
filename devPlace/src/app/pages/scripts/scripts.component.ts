import { Component, OnInit } from '@angular/core';
import { Script, ScriptService } from '../../services/script.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scripts',
  imports: [CommonModule],
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css'],
  standalone: true,
})
export class ScriptsComponent implements OnInit {
  // resources: any[] = [
  //   { title: 'Script 1', description: 'Descripción del script 1', price: 0 },
  //   { title: 'Script 2', description: 'Descripción del script 2', price: 5 },
  //   { title: 'Script 3', description: 'Descripción del script 3', price: 10 },
  //   { title: 'Script 4', description: 'Descripción del script 3', price: 0 },
  //   { title: 'Script 5', description: 'Descripción del script 3', price: 7 },
  //   { title: 'Script 6', description: 'Descripción del script 3', price: 15 },
  //   { title: 'Script 7', description: 'Descripción del script 3', price: 20 },
  //   { title: 'Script 8', description: 'Descripción del script 3', price: 0 },
  //   { title: 'Script 9', description: 'Descripción del script 3', price: 5 },
  // ];
  // resources: Script[] = [];
  // errorMessage = '';

  // constructor(private scriptService: ScriptService) {}

  // ngOnInit(): void {
  //   this.scriptService.getScripts().subscribe({
  //     next: (res) => {
  //       this.resources = res.data;
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Error al cargar los scripts';
  //     }
  //   });
  // }

  scripts: Script[] = [];
  errorMessage = '';

  constructor(private scriptService: ScriptService) {}

  ngOnInit(): void {
    this.scriptService.getScripts().subscribe({
      next: (res) => {
        this.scripts = res.data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los scripts';
        console.error(err);
      },
    });
  }

  descargarScript(script: Script): void {
    this.scriptService.downloadScript(script.id).subscribe({
      next: (blob) => { //blob representa un objeto tipo fichero de datos planos inmutables
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `${script.title}.zip`; 
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (err) => {
        console.error('Error al descargar el script:', err);
        alert('No se pudo descargar el script.');
      }
    });
  }
  
  
}
