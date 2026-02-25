import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: '../login/login.css',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent {
  form: FormGroup;
  loading = signal(false);
  error = signal('');

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set('');

    const { nome, email, senha } = this.form.value;

    this.auth.register(nome, email, senha).subscribe({
      next: () => {
        this.router.navigate(['/tasks']); // redireciona para tasks
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Erro no cadastro');
        this.loading.set(false);
      }
    });
  }
}