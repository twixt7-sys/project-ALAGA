import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ComponentsModule } from '../../../shared/components/components-module';
import { AuthServices } from '../../../core/services';
import { Router } from '@angular/router';

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
  role: string = '';

  constructor(private auth: AuthServices, private route: Router) {}

  register() {
    const normalizedRole = this.role.toLowerCase();
    
    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password,
      role: normalizedRole
    }).subscribe({
<<<<<<< Updated upstream
      next: (res) => {
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('role', res.role);
=======
      next: () => {
        Swal.fire({
          title: "Account Created!",
          text: "You can now log in.",
          icon: "success"
        });

>>>>>>> Stashed changes
        this.auth.login({
          email: this.email,
          password: this.password
        }).subscribe({
          next: (res) => {
<<<<<<< Updated upstream
            alert('Login Successful');
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('role', res.role);
            alert("routed to: " + res.role === 'admin' ? ['admin'] : ['customer']);
            this.route.navigate(res.role === 'admin' ? ['admin'] : ['customer']);
=======
            localStorage.setItem('access_token', res.access_token);
            const user = this.auth.getCurrentUser();
            this.route.navigate(user?.role === 'admin' ? ['/admin'] : ['/customer']);
>>>>>>> Stashed changes
          },
          error: (err) => {
            alert('Login failed: ' + JSON.stringify(err.error));
          }
        })
      },
      error: (err) => {
        console.log(err.error);
        alert('Registration failed: ' + JSON.stringify(err.error));
      }
    });
  }
}