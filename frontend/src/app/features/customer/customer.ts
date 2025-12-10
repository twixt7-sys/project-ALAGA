import { Component } from '@angular/core';
import { Shop } from './shop/shop';
import { ComponentsModule } from '../../shared/components/components-module';
import { AuthServices } from '../../core/services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Checkout } from './checkout/checkout';
import { Orders } from './orders/orders';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [Shop, Checkout, Orders, Cart, ComponentsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {
  active: 'custShop' | 'custOrders' | 'custCart' | 'custCheckout' = 'custShop';
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

  goToCheckout() { this.active = 'custCheckout'; }

  goToShop() { this.active = 'custShop'; }

  goToOrders() { this.active = 'custOrders'; }

  goToCart() { this.active = 'custCart'; }
}
