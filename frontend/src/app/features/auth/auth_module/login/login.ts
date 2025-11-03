import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  @Output() switchToRegister = new EventEmitter<void>();

  onClickMe(): void {
    console.log('Login button clicked!');
    this.switchToRegister.emit();
  }
}
