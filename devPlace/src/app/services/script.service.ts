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

  private authHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    if (!token) {
      throw new Error('No hay token JWT en localStorage');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  

  getScripts(): Observable<{ status: string; data: Script[] }> {
    return this.http.get<{ status: string; data: Script[] }>(
      `${this.apiUrl}/script`,
      { headers: this.authHeaders() }
    );
  }

  getScriptById(id: number): Observable<{ status: string; data: Script }> {
    return this.http.get<{ status: string; data: Script }>(
      `${this.apiUrl}/show/${id}`,
      { headers: this.authHeaders() }
    );
  }

  getScriptsByUser(userId: number): Observable<{ status: string; data: Script[] }> {
    return this.http.get<{ status: string; data: Script[] }>(
      `${this.apiUrl}/user/${userId}/scripts`,
      { headers: this.authHeaders() }
    );
  }

  getMyScripts(): Observable<{ status: string; data: Script[] }> {
    console.log('🔗 GET', `${this.apiUrl}/my/scripts`);
    return this.http.get<{ status: string; data: Script[] }>(
      `${this.apiUrl}/my/scripts`,
      { headers: this.authHeaders() }
    );
  }

createScript(formData: FormData): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/script/new`,
    formData
  );
}

  updateScript(id: number, formData: FormData): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${id}/edit`,
      formData,
      { headers: this.authHeaders() }
    );
  }

  deleteScript(id: number): Observable<{ status: string; message: string }> {
    return this.http.post<{ status: string; message: string }>(
      `${this.apiUrl}/${id}`,
      {},
      { headers: this.authHeaders() }
    );
  }

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
