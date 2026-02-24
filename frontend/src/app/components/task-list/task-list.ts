import { Component, computed, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item';
import { signal } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  standalone: true,
  imports: [CommonModule, TaskItemComponent]
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks = this.taskService.tasks;
  showModalCreateTask = signal(false);
  pendingTasks = computed(() => this.tasks().filter(t => !t.completed).length);
  completedTasks = computed(() => this.tasks().filter(t => t.completed).length);
  searchTerm = this.taskService.searchTerm;
  searchStatus = this.taskService.searchStatus;
  searchPriority = this.taskService.searchPriority;

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

  filteredTasks = computed(() => {
  let tasks = this.tasks();

  const term = this.searchTerm().toLowerCase().trim();
  const status = this.searchStatus();
  const priority = this.searchPriority();

  if (term) {
    tasks = tasks.filter(task =>
      task.title.toLowerCase().includes(term) ||
      task.description?.toLowerCase().includes(term)
    );
  }

  if (status === 'pendente') {
    tasks = tasks.filter(task => !task.completed);
  }

  if (status === 'concluida') {
    tasks = tasks.filter(task => task.completed);
  }

  if (priority.length > 0) {
    tasks = tasks.filter(task =>
      priority.includes(task.priority ?? '')
    );
  }

  return tasks;
});
}