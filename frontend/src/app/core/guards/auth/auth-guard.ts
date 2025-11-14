import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthServices } from '../../services';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthServices)

  return !auth.isLoggedIn() ? false : true
};
