import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  due_date: string | null;
  priority: string | null;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private API = 'http://localhost:3000/tasks';

  private _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  constructor(private http: HttpClient) {}

  loadTasks() {
    this.http.get<Task[]>(this.API).subscribe(tasks => this._tasks.set(tasks));
  }

  createTask(title: string, description: string = '', priority: string = 'nenhuma', due_date: string | null = null) {
    return this.http.post<Task>(this.API, { title, description, priority, due_date }).pipe(tap(task => {
      this._tasks.update(tasks => [...tasks, task]);
    }));
  }

  updateTask(id: number, task: Partial<Task>) {
    return this.http.put<Task>(`${this.API}/${id}`, task).pipe(
      tap(updated => {
        this._tasks.update(tasks =>
          tasks.map(t => t.id === id ? updated : t)
        );
      })
    );
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.API}/${id}`).pipe(
      tap(() => {
        this._tasks.update(tasks =>
          tasks.filter(t => t.id !== id)
        );
      })
    );
  }
}