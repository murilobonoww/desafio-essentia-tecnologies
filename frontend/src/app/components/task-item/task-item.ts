import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.css'],

  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  isEditing = signal(false);
  input_title_value: string  = '';

  get isCompleted(): boolean {
  return this.task ? this.task.completed : false;
}

  toggleCompleted() {
    this.taskService.updateTask(this.task.id, { completed: !this.task.completed }).subscribe({
      next: () => this.taskUpdated.emit(),
      error: (err) => console.error('Erro ao atualizar tarefa', err)
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => this.taskDeleted.emit(),
      error: (err) => console.error('Erro ao deletar tarefa', err)
    });
  }

  openEdit() {
    this.isEditing.set(true);
    this.input_title_value = this.task.title;
  }

  cancellEditTask() {
    this.isEditing.set(false);
  }

  editTask() {
    this.taskService.updateTask(this.task.id, { title: this.input_title_value }).subscribe({
      next: () => {
        this.taskUpdated.emit();
        this.isEditing.set(false);
      },
      error: (err) => console.error('Erro ao atualizar tarefa', err)
    })
  }
}