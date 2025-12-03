import { Routes } from '@angular/router';
import { Customer } from './features/customer/customer'
import { Admin } from './features/admin/admin.component';
import { Auth } from './features/auth/auth';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth/auth-guard';
import { roleGuard } from './core/guards/role/role-guard';

export const routes: Routes = [
    {
      path: '',
      component: Home
    },
    {
      path: 'auth',
      component: Auth
    },
    {
      path: 'customer',
      component: Customer,
      canActivate: [authGuard, roleGuard],
      data: { roles: ['customer'] }
    },
    {
      path: 'admin',
      loadComponent: () => import('./features/admin/admin.component').then(m => m.Admin),
      canActivate: [authGuard, roleGuard],
      data: { roles: ['admin'] }
    }
];

