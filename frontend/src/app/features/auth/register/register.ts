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
      next: () => {
        Swal.fire({
          title: "Account Created!",
          text: "You can now log in.",
          icon: "success"
        });

        // Auto-login immediately after registration
        this.auth.login({
          email: this.email,
          password: this.password
        }).subscribe({
          next: (res) => {
            // Store JWT ONLY (not userId, not role)
            localStorage.setItem('access_token', res.access_token);

            // Decode role using your existing auth service
            const user = this.auth.getCurrentUser();

            this.route.navigate(user?.role === 'admin' ? ['/admin'] : ['/customer']);
          },
          error: (err) => {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: err.error?.message || "Unable to log in after registration."
            });
          }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.error?.message || err.message
        });
      }
    });
  }
}
