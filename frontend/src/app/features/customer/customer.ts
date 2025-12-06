import { Component } from '@angular/core';
import { Shop } from './shop/shop';
import { ComponentsModule } from '../../shared/components/components-module';
import { AuthServices } from '../../core/services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [Shop, ComponentsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {
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
