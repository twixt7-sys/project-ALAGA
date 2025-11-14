import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthServices } from '../../services';

export const customerGuard: CanActivateFn = (route, state) => {
  // get user role
  const role = inject(AuthServices).getRole()
  // return true if user is admin
  return role == 'admin' ? true : false;
};
