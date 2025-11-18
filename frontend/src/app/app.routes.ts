import { Routes } from '@angular/router';
import { Customer } from './features/customer/customer'
import { Admin } from './features/admin/admin.component';
import { Auth } from './features/auth/auth';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth/auth-guard';
import { customerGuard } from './core/guards/customer/customer-guard';
import { adminGuard } from './core/guards/admin/admin-guard';

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
      canActivate: [authGuard, customerGuard]
    },
    {
      path: 'admin',
      component: Admin,
      canActivate: [authGuard, adminGuard]
    }
];

