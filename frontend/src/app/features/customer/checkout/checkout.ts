import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CartItem } from '../../../core/models/cart-item.model';
import Swal from 'sweetalert2';
import { CartServices } from '../../../core/services/model/cart/cart-services';
import { CheckService } from '../../../core/services/util/check-service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
    deliveryForm!: FormGroup;
  cartItems: CartItem[] = [];
  placing = false;

  @Output() toCartEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private cartService: CartServices,
    private checkService: CheckService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.checkService.userNotFound()) {
      Swal.fire('Error', 'User not logged in', 'error');
      return;
    }

    this.deliveryForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      notes: ['']
    });

    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: res => this.cartItems = res.items,
      error: () => Swal.fire('Error', 'Failed to load cart', 'error')
    });
  }

  get subtotal() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  currency(v: number) {
    return '$' + v.toFixed(2);
  }

  backToCart() {
    this.toCartEvent.emit();
  }

  placeOrder() {
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    if (this.cartItems.length === 0) {
      Swal.fire('Empty Cart', 'Your cart is empty', 'info');
      return;
    }

    this.placing = true;

    this.cartService.checkout().subscribe({
      next: () => {
        Swal.fire('Success', 'Order placed successfully', 'success');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        Swal.fire(
          'Checkout Failed',
          err.error?.error ?? 'Something went wrong',
          'error'
        );
        this.placing = false;
      }
    });
  }
}
