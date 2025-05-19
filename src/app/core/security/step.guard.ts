import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const stepGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const expectedStep = Number(route.data['step']);
  const currentStep = Number(localStorage.getItem('step')) || 0;

  if (currentStep === expectedStep)
    return true

  switch (currentStep) {
    case 0:
      return router.parseUrl('/');    
    case 1:
      return router.parseUrl('/chat')
    case 2:
      return router.parseUrl('/results')
    default:
      return router.parseUrl('/');
  }
}
