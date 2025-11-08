import { Component, signal } from '@angular/core';
import { AuthModule } from './auth_module/auth-module';
import { ComponentsModule } from '../../shared/components/components-module';

@Component({
	selector: 'app-auth',
  imports: [AuthModule, ComponentsModule],
	templateUrl: './auth.html',
	styleUrls: ['./auth.scss']
})
export class Auth {
	mode: 'login' | 'register' = 'login';
}
