import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = localStorage.getItem('userId');

  if (!userId) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
