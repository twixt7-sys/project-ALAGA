import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../../services';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthServices)
  const role = auth.getRole()

  // return true if user is admin
  return role === 'admin';
};
