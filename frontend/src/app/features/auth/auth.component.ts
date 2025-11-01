import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './loginn/login.component';
import { RegisterComponent } from './registerr/register.component';

@Component({
  selector: 'auth-root',
  imports: [RouterOutlet, LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  protected readonly title = signal('frontend');
  url = 'https://i.imgur.com/4ZLHm0Y.png';
  login = signal(true);
	toggleForm(isLogin: boolean) {
		this.login.set(isLogin);
	}
}
