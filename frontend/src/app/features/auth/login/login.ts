import { Component, EventEmitter, Output, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsModule } from '../../../shared/components/components-module';
import { AuthServices } from '../../../core/services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  @Input() classAppend: string = '';

  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private auth: AuthServices, private route: Router){

  }

  login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        Swal.fire({
          title: "Success!",
          text: "User Logged in!",
          icon: "success"
        });
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('role', res.role);
        alert(res.user);
        this.route.navigate(res.user.role === 'admin' ? ['/admin'] : ['/customer']);
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.message}`,
          footer: `<a href="#">Why do I have this issue?</a>`
        });
      }
    })
  }
}
