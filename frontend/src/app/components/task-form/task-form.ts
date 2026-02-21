import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],

  standalone: true,
  imports: [FormsModule]
})

export class TaskFormComponent {
  title: string = '';
  @Output() taskCreated = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  createTask() {
    if (!this.title.trim()) return;

    this.taskService.createTask(this.title).subscribe({
      next: () => {
        this.title = '';
        this.taskCreated.emit();
      },
      error: (err) => console.error('Erro ao criar tarefa: ', err)
    });
  }

  cancelCreateTask() {
    this.closeModal.emit();
  }
}