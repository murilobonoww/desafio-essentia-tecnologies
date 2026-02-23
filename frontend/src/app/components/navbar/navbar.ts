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
   constructor(private taskService: TaskService) {}

  createTask() {
    this.showCreateTaskModal.set(true);
  }

  closeCreateTaskModal() {
    this.showCreateTaskModal.set(false);
  }

  CreateTask() {
    this.taskService.createTask(this.newTaskTitle, this.newTaskDescription).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.showCreateTaskModal.set(false);
      },
      error: (err) => console.error('Erro ao criar tarefa: ', err)
    });

  }
}