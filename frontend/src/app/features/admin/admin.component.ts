import { Component } from '@angular/core';
import { AdminDashboardComponent } from './dashboard/dashboard';
import { AuthServices } from '../../core/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComponentsModule } from '../../shared/components/components-module';
import { Orders } from './orders/orders';
import { Inventory } from './inventory/inventory';
import { Products } from './products/products';

@Component({
  selector: 'app-admin',
  imports: [AdminDashboardComponent, ComponentsModule, Orders, Inventory, Products],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class Admin {
  active: 'adminDashboard' | 'adminOrders' | 'adminInventory' | 'adminProducts' = 'adminDashboard';
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

  goToDashboard() { this.active = 'adminDashboard'; }
  goToOrders() { this.active = 'adminOrders'; }
  goToProducts() { this.active = 'adminProducts'; }
  goToInventory() { this.active = 'adminInventory'; }
}
