import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';

  constructor() {}
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  logout(): void {
  localStorage.removeItem('token');
}

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }
  

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles ? payload.roles[0] : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserInfo(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Token inválido', error);
      return null;
    }
  }
}
