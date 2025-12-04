import { Routes } from '@angular/router';
import { Customer } from './features/customer/customer'
import { Admin } from './features/admin/admin.component';
import { Auth } from './features/auth/auth';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth/auth-guard';
import { customerGuard } from './core/guards/customer/customer-guard';
import { adminGuard } from './core/guards/admin/admin-guard';
import { loginGuard } from './core/guards/login/login-guard';

export const routes: Routes = [
    {
      path: '',
      component: Home
    },
    {
      path: 'auth',
      component: Auth,
      //canActivate: [loginGuard]
    },
    {
      path: 'customer',
      component: Customer,
      canActivate: [authGuard, customerGuard]
    },
    {
      path: 'admin',
      loadComponent: () => import('./features/admin/admin.component').then(m => m.Admin),
      canActivate: [authGuard, adminGuard]
    }
];

