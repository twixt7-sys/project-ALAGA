import { Component } from '@angular/core';
import { AuthModule } from './auth_module/auth-module';

@Component({
  selector: 'app-auth',
  imports: [AuthModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

}
