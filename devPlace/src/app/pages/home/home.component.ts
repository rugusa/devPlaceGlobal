import { Component, OnInit } from '@angular/core';
import { Script, ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  scripts: Script[] = [];
  errorMessage: string = '';

  constructor(private scriptService: ScriptService) {}

  loadScripts(): void {
    this.scriptService.getScripts().subscribe({
      next: (response) => {
        this.scripts = response.data;
      },
      error: (error) => {
        console.error('Error al cargar scripts:', error);
        this.errorMessage = 'No se pudieron cargar los scripts.';
      }
    });
  }

}
