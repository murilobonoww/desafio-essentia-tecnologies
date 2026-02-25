import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ListChecks, Search, X, Funnel, LogOut, RotateCcw } from "lucide-angular";
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './navbar.css',
  imports: [RouterModule, LucideAngularModule, CommonModule, FormsModule, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  // imports de icones do lucide-angular
  readonly ListChecks = ListChecks;
  readonly Search = Search;
  readonly X = X;
  readonly Funnel = Funnel;
  readonly LogOut =LogOut;
  readonly RotateCcw = RotateCcw;
  // ----------------------------------
  showCreateTaskModal = signal(false);
  showFilterModal = signal(false);
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  priority: string = 'nenhuma';
  selectedDate: Date | null = null;

  searchTerm: string = '';
  searchStatus: string = '';
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  onSearch() {
    this.taskService.searchTerm.set(this.searchTerm);
  }

  searchByStatus(status: string) {
    this.taskService.searchStatus.set(status);
  }

  searchByPriority(priority: string) {
    const current = this.taskService.searchPriority();

    if (current.includes(priority)) {
      // remove
      this.taskService.searchPriority.set(
        current.filter(p => p !== priority)
      );
    } else {
      // adiciona
      this.taskService.searchPriority.set(
        [...current, priority]
      );
    }
  }
  constructor(private auth: AuthService, public router: Router, public taskService: TaskService,private toastr: ToastrService ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  openCreateTaskModal() {
    this.showCreateTaskModal.set(true);
  }

  closeCreateTaskModal() {
    this.showCreateTaskModal.set(false);
  }

  openFilterModal() {
    this.showFilterModal.set(true);
  }

  closeFilterModal() {
    this.showFilterModal.set(false);
  }

  CreateTask() {
    const formattedDate = this.selectedDate ? this.selectedDate.toISOString().split('T')[0] : null;
    this.taskService.createTask(this.newTaskTitle, this.newTaskDescription, this.priority, formattedDate).subscribe({
      next: () => {
        this.toastr.success('Tarefa criada com sucesso!', 'Sucesso!');
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.priority = 'nenhuma';
        this.selectedDate = null;
        this.showCreateTaskModal.set(false);
      },
      error: (err) => {
        this.toastr.error('Erro ao criar tarefa', 'Erro')
        console.error('Erro ao criar tarefa: ', err)
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  clearFilters() {
    this.taskService.clearFilters();
    this.closeFilterModal();
  }
}