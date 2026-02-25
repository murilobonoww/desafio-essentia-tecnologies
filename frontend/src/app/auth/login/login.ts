import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  form: FormGroup;
  loading = signal(false);
  error = signal('');

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set('');

    const { email, senha } = this.form.value;

    this.auth.login(email, senha).subscribe({
      next: () => {
        this.router.navigate(['/tasks']); // redireciona para tasks
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Erro no login');
        this.loading.set(false);
      }
    });
  }
}