import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar';
import { AuthService, currentUser } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <app-navbar *ngIf="showNavbar()"></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  currentUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
      this.cdr.detectChanges();
      // console.log('Rota atual:', this.currentUrl); // descomente para debuggar
    });
  }

  ngOnInit() {
    this.authService.loadCurrentUser().subscribe({
      next: (user: any) => {
        currentUser.set(user);
      },
      error: () => {
        currentUser.set(null);
      }
    });
  }

  showNavbar(): boolean {
    const publicRoutes = [
      '/login',
      '/register'
    ];

    return !publicRoutes.includes(this.currentUrl);
  }
}