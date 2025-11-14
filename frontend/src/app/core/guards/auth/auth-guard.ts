import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthServices } from '../../services/auth-services';

export const authGuard: CanActivateFn = (route, state) => {
  // get services
  const auth = inject(AuthServices)

  if (!auth.isLoggedIn()) return false

  // guard by userId from localstorage
  if (!localStorage.getItem('userId')) {
    inject(Router).navigate(['/login']);
    return false;
  }

  const role = auth.getRole()

  const needs = route.data['role'] as string

  if (!auth.isLoggedIn()) return false
  if (needs && role !== needs) return false

  return true
};
