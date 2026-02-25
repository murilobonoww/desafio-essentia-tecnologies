// src/app/auth/auth-guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, take, switchMap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('[Guard] Iniciando verificação de autenticação');

  // Primeiro tenta usar o que já tem no signal
  if (authService.getCurrentUser()) {
    console.log('[Guard] Usuário já existe no signal → liberado imediatamente');
    return of(true);
  }

  // Se não tem → força o carregamento e espera o resultado
  console.log('[Guard] Nenhum usuário no signal → forçando loadCurrentUser');

  return authService.loadCurrentUser().pipe(
    // Após carregar, verifica o signal atualizado (mais confiável que o retorno direto)
    switchMap(() => {
      const user = authService.getCurrentUser();
      console.log('[Guard] Após load: usuário no signal?', !!user, user);
      return of(!!user);
    }),
    map(isAuth => {
      if (isAuth) {
        console.log('[Guard] Autenticado → prosseguir');
        return true;
      }

      console.log('[Guard] Não autenticado → redirecionando para login');
      return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }),
    catchError(err => {
      console.error('[Guard] Erro crítico no loadCurrentUser:', err);
      return of(router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      }));
    }),
    take(1)
  );
};