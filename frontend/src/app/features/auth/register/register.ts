import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  @Input() label: string = 'Register';
  @Input() options: string = '';
}
