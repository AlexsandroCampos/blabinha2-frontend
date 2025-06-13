import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const stepGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const expectedStep = Number(route.data['step']);
  const currentStep = Number(localStorage.getItem('step')) || 0;

  const id = route.params['id'] || localStorage.getItem('chatId');

  if (currentStep === expectedStep) {
    return true;
  }

  switch (currentStep) {
    case 0:
      return router.parseUrl('/');
    case 1:
      return router.parseUrl(`/chat/${id || ''}`); 
    case 2:
      return router.parseUrl(`/chat/${id || ''}/results`);
    default:
      return router.parseUrl('/');
  }
}
