import { Routes } from '@angular/router';

import { AuthComponent } from './features/auth/auth.component';
//import { HomePage } from '.';
//import { AdminPage } from '.';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
	{ path: '**', redirectTo: 'auth' },
  //{ path: 'home', component: HomePage },
  //{ path: 'admin', component: AdminPage }
];
