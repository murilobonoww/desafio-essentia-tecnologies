import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // URL do seu backend
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`, { headers: this.getHeaders() });
  }

  createTask(task: { title: string; description?: string; due_date?: string; priority?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, task, { headers: this.getHeaders() });
  }

  updateTask(id: number, task: Partial<{ title: string; description: string; due_date: string; priority: string; completed: boolean }>): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task, { headers: this.getHeaders() });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`, { headers: this.getHeaders() });
  }
}