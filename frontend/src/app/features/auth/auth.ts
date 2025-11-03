import { Component, signal } from '@angular/core';
import { AuthModule } from './auth_module/auth-module';
import { ComponentsModule } from '../../shared/components/components-module';

@Component({
  selector: 'app-auth',
  imports: [AuthModule, ComponentsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  protected readonly loginEnabled = signal(false);
}
