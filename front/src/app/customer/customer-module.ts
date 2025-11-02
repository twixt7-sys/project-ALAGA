import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shop } from './shop/shop';
import { Orders } from './orders/orders';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';



@NgModule({
  declarations: [
    Shop,
    Orders,
    Cart,
    Checkout
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
