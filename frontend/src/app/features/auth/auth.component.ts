import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { c1 } from './register/register.component'

@Component({
  selector: 'auth-root',
  imports: [RouterOutlet, LoginComponent, RegisterComponent, c1],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  protected readonly title = signal('frontend');
  url = 'https://i.imgur.com/4ZLHm0Y.png';
  login = true;
	toggleForm(value: boolean) { this.login = value; }
}
