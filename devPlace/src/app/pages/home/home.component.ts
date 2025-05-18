import { Component, OnInit } from '@angular/core';
import { Script, ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  scripts: Script[] = [];
  errorMessage = '';

  constructor(private scriptService: ScriptService) {}

   ngOnInit(): void {
   }
 }
