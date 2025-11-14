import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../../services';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  // get user role
  const role = inject(AuthServices).getRole()
  // return true if user is admin
  return role == 'admin' ? true : false;
};
