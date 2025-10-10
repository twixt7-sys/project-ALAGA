import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-root',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  protected readonly title = signal('frontend');
  url = 'https://i.imgur.com/4ZLHm0Y.png';
  login = true;

	toggleForm(value: boolean) { this.login = value; }
}
