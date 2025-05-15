import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-myscripts',
  templateUrl: './myscripts.component.html',
  styleUrls: ['./myscripts.component.css'],
  standalone: true
})
export class MyscriptsComponent implements OnInit {
  scripts: any[] = [];
  errorMessage = '';

  constructor(private scriptService: ScriptService) {}

  ngOnInit(): void {
    this.scriptService.getMyScripts().subscribe({
      next: (res) => this.scripts = res.data,
      error: (err) => {
        this.errorMessage = 'Error al obtener scripts del usuario';
        console.error('Error al obtener scripts del usuario:', err);
      }
    });
  }
}
