import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8070/api/register'; 
  constructor(private http: HttpClient) { }
  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
