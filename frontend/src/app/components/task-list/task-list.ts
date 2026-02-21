import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form';
import { TaskItemComponent } from '../task-item/task-item';
import { signal } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskItemComponent]
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;
  showModalCreateTask = signal(false);

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  trackById(index: number, task: Task) {
    return task.id;
  }

  open_modal_create_task() {
    this.showModalCreateTask.set(true)
  }

  closeModal() {
    this.showModalCreateTask.set(false);
  }
}