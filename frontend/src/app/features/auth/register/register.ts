import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ComponentsModule } from '../../../shared/components/components-module';

@Component({
  selector: 'app-register',
  imports: [ComponentsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  @Input() label: string = 'Register';
  @Input() options: string = '';
}
