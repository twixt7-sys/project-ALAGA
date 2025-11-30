import { Component, EventEmitter, Output, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsModule } from '../../../shared/components/components-module';
import { AuthServices } from '../../../core/services';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  @Input() classAppend: string = '';

  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private auth: AuthServices, route: Router){

  }

  login() {
    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        // success
      },
      error: (err) => {
        // error
      }
    })
  }
}
