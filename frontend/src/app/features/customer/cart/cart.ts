import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CartServices, CheckService } from '../../../core/services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { CartItem } from '../../../core/models/cart-item.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {

  cartItems: CartItem[] = [];


  loading = true;
  error = false;

  @Output() checkout = new EventEmitter<void>();

  constructor(
    private cartService: CartServices,
    private checkService: CheckService,
    private router: Router
  ){}

  cart: CartItem[] = [];

  ngOnInit(): void {
    if (this.checkService.userNotFound()) {
      this.loading = false;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed'
      });
      return;
    }

    this.loadCart();
  }

  loadCart() {
    this.loading = true;

    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartItems = res.items;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  increase(item: CartItem) {
    if (item.quantity >= item.product.stockQuantity) return;

    this.cartService
      .updateItem(item.cart_item_id, item.quantity + 1)
      .subscribe(() => item.quantity++);
  }

  decrease(item: CartItem) {
    if (item.quantity <= 1) return;

    this.cartService
      .updateItem(item.cart_item_id, item.quantity - 1)
      .subscribe(() => item.quantity--);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.cart_item_id).subscribe(() => {
      this.cartItems = this.cartItems.filter(
        i => i.cart_item_id !== item.cart_item_id
      );
    });
  }


  get subtotal() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }


  currency(value: number) {
    return '$' + value.toFixed(2);
  }

  proceedToCheckout() {
    this.checkout.emit();
  }
}
