import { Component, signal } from '@angular/core';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ComponentsModule } from '../../shared/components/components-module';

@Component({
	selector: 'app-auth',
  imports: [ComponentsModule, LoginComponent, RegisterComponent],
	templateUrl: './auth.html',
	styleUrls: ['./auth.scss']
})
export class Auth {
	mode: 'login' | 'register' = 'login';
}
