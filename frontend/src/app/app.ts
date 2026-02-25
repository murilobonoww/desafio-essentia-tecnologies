import { Component, OnInit } from '@angular/core';  // ← adicione OnInit se quiser
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { AuthService, currentUser } from './services/auth.service'; // ← importe currentUser daqui

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {  // ← opcional: implements OnInit
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Busca o usuário logado ao iniciar a aplicação (via cookie httpOnly)
    this.authService.loadCurrentUser().subscribe({
      next: (user: any) => {
        currentUser.set(user);
      },
      error: () => {
        currentUser.set(null);
        // Opcional: redirecionar para login se quiser forçar
        // this.router.navigate(['/login']);
      }
    });
  }
}