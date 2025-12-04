import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ComponentsModule } from '../../../shared/components/components-module';
import { AuthServices } from '../../../core/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  @Input() label: string = 'Register';
  @Input() options: string[] = [];
  @Input() classAppend: string = '';

  username: string = '';
  email: string = '';
  password: string = '';
  role: string = 'customer';

  constructor(private auth: AuthServices, private route: Router) {}

  register() {
    const normalizedRole = this.role.toLowerCase();

    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password,
      role: normalizedRole
    }).subscribe({
      next: (res) => {
        Swal.fire({
          title: "Success!",
          text: `${res.message}`,
          icon: "success"
        });
        this.auth.login({
          username: this.username,
          email: this.email
        }).subscribe({
          next: (res) => {
            localStorage.setItem('access_token', res.access_token); // token storage
            localStorage.setItem('user', JSON.stringify(res.user)); // user storage
            this.route.navigate(res.user.role === 'admin' ? ['/admin'] : ['/customer']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.message}`,
          footer: `<a href="#">Why do I have this issue?</a>`
        });
      }
    });
  }
}
