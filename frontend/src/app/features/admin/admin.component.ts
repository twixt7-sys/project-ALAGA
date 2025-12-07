import { Component } from '@angular/core';
import { AdminDashboardComponent } from './dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { AuthServices } from '../../core/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComponentsModule } from '../../shared/components/components-module';

@Component({
  selector: 'app-admin',
  imports: [AdminDashboardComponent, ComponentsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class Admin {
  user = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(
    private authService: AuthServices,
    private router: Router
  ){}
  logout() {
    this.authService.logout();
    Swal.fire({
      title: "Success!",
      text: "User Logged Out!",
      icon: "success"
    });
    this.router.navigate(['/auth']);
  }
}
