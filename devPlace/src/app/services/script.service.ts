import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Script {
  id: number;
  title: string;
  description: string;
  price: number;
  created_at: string;
  file_path?: string;
  user_id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private apiUrl = 'http://localhost:8070/api';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /** Construye el header Authorization con el JWT */
  private authHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    if (!token) {
      throw new Error('No hay token JWT en localStorage');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /** Obtiene todos los scripts */
  getScripts(): Observable<{ status: string; data: Script[] }> {
    return this.http.get<{ status: string; data: Script[] }>(
      `${this.apiUrl}/script`,
      { headers: this.authHeaders() }
    );
  }

  /** Obtiene un script por su ID */
  getScriptById(id: number): Observable<{ status: string; data: Script }> {
    return this.http.get<{ status: string; data: Script }>(
      `${this.apiUrl}/show/${id}`,
      { headers: this.authHeaders() }
    );
  }

  /** Obtiene todos los scripts de un usuario (por su ID) */
  getScriptsByUser(userId: number): Observable<{ status: string; data: Script[] }> {
    return this.http.get<{ status: string; data: Script[] }>(
      `${this.apiUrl}/user/${userId}/scripts`,
      { headers: this.authHeaders() }
    );
  }

  /** Obtiene los scripts del usuario autenticado */
  getMyScripts(): Observable<{ status: string; data: Script[] }> {
    console.log('🔗 GET', `${this.apiUrl}/my/scripts`);
    return this.http.get<{ status: string; data: Script[] }>(
      `${this.apiUrl}/my/scripts`,
      { headers: this.authHeaders() }
    );
  }

  /** Crea un nuevo script (envía FormData con archivo) */
  createScript(formData: FormData): Observable<{ status: string; data: { id: number; title: string; file_url: string } }> {
    return this.http.post<{ status: string; data: { id: number; title: string; file_url: string } }>(
      `${this.apiUrl}/script/new`,
      formData,
      { headers: this.authHeaders() }
    );
  }

  /** Actualiza un script existente */
  updateScript(id: number, scriptData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${id}/edit`,
      scriptData,
      { headers: this.authHeaders() }
    );
  }

  /** Borra un script */
  deleteScript(id: number): Observable<{ status: string; message: string }> {
    return this.http.post<{ status: string; message: string }>(
      `${this.apiUrl}/${id}`,
      {},
      { headers: this.authHeaders() }
    );
  }

  /** Descarga el fichero de un script */
  downloadScript(id: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/script/${id}/downloadScript`,
      {
        responseType: 'blob',
        headers: this.authHeaders()
      }
    );
  }
}
