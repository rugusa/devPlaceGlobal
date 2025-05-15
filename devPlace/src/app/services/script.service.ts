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
}

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private apiUrl = 'http://localhost:8070/api/script'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  getScripts(): Observable<{ status: string; data: Script[] }> {
    return this.http.get<{ status: string; data: Script[] }>(this.apiUrl);
  }
  getScriptById(id: number): Observable<{ status: string; data: Script }> {
    return this.http.get<{ status: string; data: Script }>(
      `${this.apiUrl}/${id}`
    );
  }
  getScriptsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/scripts/user/${userId}`);
  }

  // createScript(formData: FormData): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/new`, formData);
  // }
  createScript(formData: FormData): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/new`, formData, { headers });
  }
  getMyScripts(): Observable<{ status: string; data: Script[] }> {
    return this.http.get<{ status: string; data: Script[] }>(
      'http://localhost:8070/api/my/scripts'
    );
  }

  updateScript(id: number, scriptData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/edit`, scriptData);
  }
  deleteScript(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, {});
  }
  downloadScript(id: number): Observable<Blob> {
    return this.http.get(
      `http://localhost:8070/api/script/${id}/downloadScript`,
      {
        responseType: 'blob',
      }
    );
  }
}
