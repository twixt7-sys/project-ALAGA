import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  @Output() switchToLogin = new EventEmitter<void>();

  onClickMe(): void {
    console.log('Register button clicked!');
    this.switchToLogin.emit();
  }
}
