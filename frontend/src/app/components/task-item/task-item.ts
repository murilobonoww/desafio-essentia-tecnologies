import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.css'],

  standalone: true,
  imports: [FormsModule]
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

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
}