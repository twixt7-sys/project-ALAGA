import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'login-form',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	email = signal('');
	password = signal('');

	onSubmit() {
		console.log('Logging in with:', {
			email: this.email(),
			password: this.password()
		});
	}
}
