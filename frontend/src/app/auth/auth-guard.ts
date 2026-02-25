// src/app/auth/auth-guard.ts  (ou onde você colocou)
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // seu serviço de auth

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {          // ou authService.isAuthenticated(), checkToken(), etc.
    return true;
  }

  // Se não estiver logado → redireciona pro login e passa a URL atual como query param (bom pra voltar depois)
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};