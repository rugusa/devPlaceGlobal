import { Component } from '@angular/core';

@Component({
  selector: 'app-scripts',
  imports: [],
  templateUrl: './scripts.component.html',
  styleUrl: './scripts.component.css'
})
export class ScriptsComponent {
  resources: any[] = [
    { title: 'Script 1', description: 'Descripción del script 1', price: 0 },
    { title: 'Script 2', description: 'Descripción del script 2', price: 5 },
    { title: 'Script 3', description: 'Descripción del script 3', price: 10 },
    { title: 'Script 4', description: 'Descripción del script 3', price: 0 },
    { title: 'Script 5', description: 'Descripción del script 3', price: 7 },
    { title: 'Script 6', description: 'Descripción del script 3', price: 15 },
    { title: 'Script 7', description: 'Descripción del script 3', price: 20 },
    { title: 'Script 8', description: 'Descripción del script 3', price: 0 },
    { title: 'Script 9', description: 'Descripción del script 3', price: 5 },
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí se haría una llamada HTTP al backend para obtener los scripts
  }

}
