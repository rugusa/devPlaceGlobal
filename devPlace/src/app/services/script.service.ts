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
  //private apiUrl = 'http://server-php-devplace:80/api/script';

  constructor(private http: HttpClient) { }

  getScripts(): Observable<{ status: string, data: Script[] }> {
    return this.http.get<{ status: string, data: Script[] }>(this.apiUrl);
  }
  getScriptById(id: number): Observable<{ status: string, data: Script }> {
    return this.http.get<{ status: string, data: Script }>(`${this.apiUrl}/${id}`);
  }
  createScript(scriptData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, scriptData);
  }
  updateScript(id: number, scriptData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/edit`, scriptData);
  }
  deleteScript(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, {});
  }
}
