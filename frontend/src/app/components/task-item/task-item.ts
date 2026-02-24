import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { CheckboxSplashComponent } from '../checkbox-splash/checkbox-splash';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LucideAngularModule, Calendar, EllipsisVertical, X } from "lucide-angular";

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, CheckboxSplashComponent, LucideAngularModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule]
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter<void>();

  constructor(private taskService: TaskService) { }
  readonly Calendar = Calendar;
  readonly EllipsisVertical = EllipsisVertical;
  readonly X = X;
  DueDate: Date | null = null;
  priority: string = 'nenhuma';

  isEditing = signal(false);
  showOptions = signal(false);
  input_title_value: string = '';
  input_description_value: string = '';

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
    this.input_description_value = this.task.description || '';
    this.priority = this.task.priority || 'nenhuma';
  }

  openOptions() {
    this.showOptions.set(!this.showOptions());
  }

  cancellEditTask() {
    this.isEditing.set(false);
  }

  editTask() {
    const formattedDate = this.DueDate ? this.DueDate.toISOString().split('T')[0] : null;
    this.taskService.updateTask(this.task.id, { title: this.input_title_value, description: this.input_description_value, priority: this.priority, due_date: formattedDate }).subscribe({
      next: () => {
        this.taskUpdated.emit();
        this.isEditing.set(false);
        this.DueDate = null
      },
      error: (err) => console.error('Erro ao atualizar tarefa', err)
    })
  }

private formatFromISO(date: string | null): string {
  if (!date) return '';

  const d = new Date(date);

  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
}