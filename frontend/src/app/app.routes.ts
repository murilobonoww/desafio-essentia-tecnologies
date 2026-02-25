import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];