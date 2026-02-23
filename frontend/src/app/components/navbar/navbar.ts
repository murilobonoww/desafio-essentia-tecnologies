import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ListChecks, Search, X } from "lucide-angular";
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './navbar.css',
  imports: [RouterModule, LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  readonly ListChecks = ListChecks;
  readonly Search = Search;
  readonly X = X;
  showCreateTaskModal = signal(false);
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  priority: string = 'nenhuma';
  DueDate: string = '';

  onDateInput() {
    let value = this.DueDate.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }

    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }

    this.DueDate = value;
  }
  constructor(private taskService: TaskService) { }

  openCreateTaskModal() {
    this.showCreateTaskModal.set(true);
  }

  closeCreateTaskModal() {
    this.showCreateTaskModal.set(false);
  }

  CreateTask() {
    const formattedDate = this.formatToISO(this.DueDate);
    this.taskService.createTask(this.newTaskTitle, this.newTaskDescription, this.priority, formattedDate).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.priority = 'nenhuma';
        this.DueDate = '';
        this.showCreateTaskModal.set(false);
      },
      error: (err) => console.error('Erro ao criar tarefa: ', err)
    });
  }

  private formatToISO(date: string): string | null {
    if (!date) return null;

    const parts = date.split('/');
    if (parts.length !== 3) return null;

    const [day, month, year] = parts;

    return `${year}-${month}-${day}`;
  }
}