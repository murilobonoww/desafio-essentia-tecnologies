import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api_url = 'http://localhost:3000/user';

  private isAuthenticated = false;

  constructor(private http: HttpClient) { }
  // Adicione isso!
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Melhore isLoggedIn para usar o token real
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Opcional: checa expiração (recomendado!)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() < payload.exp * 1000;
    } catch {
      return false;
    }
  }

  login(email: string, senha: string) {
    return this.http.post<{ token: string }>(`${this.api_url}/login`, { email, senha }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.isAuthenticated = true;
      })
    );
  }

  register(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.api_url}/sign-up`, { nome, email, senha }).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  //  getHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders({
  //     Authorization: token ? `Bearer ${token}` : ''
  //   });
  // }
}