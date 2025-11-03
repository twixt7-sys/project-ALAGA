import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard/dashboard';
import { Inventory } from './inventory/inventory';
import { Orders } from './orders/orders';
import { Products } from './products/products';



@NgModule({
  declarations: [
    Dashboard,
    Inventory,
    Orders,
    Products
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
