import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { signal } from '@angular/core';

export const currentUser = signal<{ id: string; email: string; nome?: string } | null>(null);

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api_url = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  // Não precisamos mais de getToken() nem localStorage para autenticação
  // Vamos manter isLoggedIn() baseado no currentUser (mais confiável no SPA)
  isLoggedIn(): boolean {
    return currentUser() !== null;
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(
      `${this.api_url}/login`,
      { email, senha },
      { withCredentials: true }
    ).pipe(
      tap(() => {
        // Login deu certo → cookie já foi setado pelo backend
        // Vamos carregar o perfil imediatamente
      })
    );
  }

  register(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(
      `${this.api_url}/sign-up`,
      { nome, email, senha },
      { withCredentials: true }
    );
    // Aqui também não precisa salvar token — cookie já vem no Set-Cookie
  }

  logout(): Observable<any> {
    // Chame um endpoint de logout no backend que limpe o cookie
    // Exemplo: res.clearCookie('token')
    return this.http.post(
      `${this.api_url}/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        currentUser.set(null);
      })
    );
  }

  // Método principal para carregar/atualizar o usuário logado
  loadCurrentUser(): Observable<any> {
    return this.http.get(
      `${this.api_url}/me`,
      { withCredentials: true }
    ).pipe(
      tap((user: any) => {
        currentUser.set(user);
      })
    );
  }

  // Opcional: método para usar em guards ou inicialização da app
  getCurrentUser() {
    return currentUser();
  }
}