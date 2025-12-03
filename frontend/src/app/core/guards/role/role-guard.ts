import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServices } from '../../services';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthServices);
  const router = inject(Router);

  const user = auth.getCurrentUser();

  alert(user?.role);

  if (!user) {
    return router.createUrlTree(['/auth']);
  }

  const requiredRoles = route.data?.['roles'] as string[];

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (requiredRoles.includes(user.role)) {
    return true;
  }

  return router.createUrlTree(['/']);
};
