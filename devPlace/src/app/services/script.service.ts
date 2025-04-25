import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Script {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private apiUrl = 'http://localhost:8000/api/script'; // URL de tu backend Symfony


  constructor(private http: HttpClient) { }

  // Obtener todos los scripts
  getScripts(): Observable<{ status: string, data: Script[] }> {
    return this.http.get<{ status: string, data: Script[] }>(this.apiUrl);
  }

  // Obtener un script por ID
  getScriptById(id: number): Observable<{ status: string, data: Script }> {
    return this.http.get<{ status: string, data: Script }>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo script
  createScript(scriptData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, scriptData);
  }

  // Editar un script
  updateScript(id: number, scriptData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/edit`, scriptData);
  }

  // Eliminar un script
  deleteScript(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, {});
  }
}
