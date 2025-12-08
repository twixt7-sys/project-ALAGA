import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CartServices, CheckService } from '../../../core/services';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  loading = true;
  error = false;

  @Output() checkout = new EventEmitter<void>();

  constructor(
    private cartService: CartServices,
    private checkService: CheckService
  ){}

  ngOnInit(): void{
    if (this.checkService.userNotFound()) {
      this.loading = false;
      return;
    }
  }

  cart: CartItem[] = [
    {
      id: 1,
      name: 'Premium Dog Food Bowl Set',
      image: 'assets/img/dog-bowl.jpg',
      price: 24.99,
      quantity: 1
    }
  ];

  increase(item: CartItem) {
    item.quantity++;
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  remove(item: CartItem) {
    this.cart = this.cart.filter(i => i.id !== item.id);
  }

  get subtotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  currency(value: number) {
    return '$' + value.toFixed(2);
  }

  proceedToCheckout() {
    this.checkout.emit();
  }
}
