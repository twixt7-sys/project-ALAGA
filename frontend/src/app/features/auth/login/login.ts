import { Component, EventEmitter, Output, Input} from '@angular/core';
import { ComponentsModule } from '../../../shared/components/components-module';


@Component({
  selector: 'app-login',
  imports: [ComponentsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  @Input() classAppend: string = '';
}
