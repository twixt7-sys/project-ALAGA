import { Routes } from '@angular/router';
import { Customer } from './features/customer/customer'
import { Admin } from './features/admin/admin.component';
import { Auth } from './features/auth/auth';

export const routes: Routes = [
    {
        path: 'auth',
        component: Auth
    },
    {
        path: 'customer',
        component: Customer
    },
    {
        path: 'admin',
        component: Admin
    }
];

