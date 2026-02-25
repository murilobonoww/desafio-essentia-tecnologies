import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { currentUser } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
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
    console.log('submitado')
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set('');

    const { email, senha } = this.form.value;

    this.auth.login(email, senha).subscribe({
      next: (res) => {
        console.log('[LOGIN] Sucesso - resposta:', res);

        this.auth.loadCurrentUser().subscribe({
          next: (user) => {
            console.log('[LOAD USER] Sucesso - user recebido:', user);
            currentUser.set(user);  // confirme que isso está aqui
            console.log('[NAVEGANDO] Tentando ir para /tasks');
            this.loading.set(false);

            this.router.navigate(['/tasks']).then(success => {
              console.log('[NAVEGAÇÃO] Resultado:', success ? 'OK' : 'FALHOU');
              if (!success) {
                console.error('[NAVEGAÇÃO] Falha - verifique rotas ou guards');
              }
            }).catch(err => {
              console.error('[NAVEGAÇÃO] Erro:', err);
            });
          },
          error: (err) => {
            console.error('[LOAD USER] Erro:', err);
            this.error.set('Erro ao carregar perfil');
            this.loading.set(false);
          }
        });
      },
      error: (err) => {
        console.error('[LOGIN] Erro:', err);
        this.error.set('Erro no login');
        this.loading.set(false);
      }
    });
  }
}