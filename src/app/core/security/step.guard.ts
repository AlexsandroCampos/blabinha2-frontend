import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const stepGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  const expectedStep = Number(route.data['step']);
  const currentStep = Number(localStorage.getItem('step')) || 0;
  const path = route.routeConfig?.path || '';

  if (!token) {
    if (path === 'login' || path === 'register') {
      return true;
    }
    return router.parseUrl('/login');
  }

  if (path === 'login' || path === 'register') {
    switch (currentStep) {
      case 0:
        return router.parseUrl('/home');
      case 1:
        return router.parseUrl(`/chat/${localStorage.getItem('chatId') || ''}`);
      case 2:
        return router.parseUrl(`/chat/${localStorage.getItem('chatId') || ''}/results`);
      default:
        return router.parseUrl('/home');
    }
  }

  if (expectedStep === currentStep) {
    return true;
  }

  switch (currentStep) {
    case 0:
      return router.parseUrl('/home');
    case 1:
      return router.parseUrl(`/chat/${localStorage.getItem('chatId') || ''}`);
    case 2:
      return router.parseUrl(`/chat/${localStorage.getItem('chatId') || ''}/results`);
    default:
      return router.parseUrl('/home');
  }
};
