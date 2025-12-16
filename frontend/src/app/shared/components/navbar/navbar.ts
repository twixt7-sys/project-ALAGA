import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Input() active: '' | 'adminDashboard' | 'adminOrders' | 'adminInventory' | 'adminProducts' | 'custShop' | 'custOrders' | 'custCart' | 'custCheckout' = '';

  constructor(private router: Router) {}
  @Input() user: User = JSON.parse(localStorage.getItem("user") || '{}');

  isAdmin: boolean = this.user.role === 'admin'? true : false;
  @Input() classAppend: string = '';

  @Input() adminPages: any = [
    "",
    "AdminOrders",
    "AdminInventory"
  ];

  @Input() customerPages: any = [
    "CustomerShop",
    "CustomerOrders",
    "CustomerCart"
  ];

  pages: Array<string> = this.isAdmin ? this.adminPages : this.customerPages;

  //admin nav items
  @Output() adminDashboardEvent = new EventEmitter<void>();
  @Output() adminOrdersEvent = new EventEmitter<void>();
  @Output() adminProductsEvent = new EventEmitter<void>();
  @Output() adminInventoryEvent = new EventEmitter<void>();

  //customer nav items
  @Output() custCartEvent = new EventEmitter<void>();
  @Output() custShopEvent = new EventEmitter<void>();
  @Output() custOrdersEvent = new EventEmitter<void>();

  @Output() logoutEvent = new EventEmitter<void>();

  // admin signals
  adminDashboard() { this.adminDashboardEvent.emit() }
  adminOrders() { this.adminOrdersEvent.emit() }
  adminInventory() { this.adminInventoryEvent.emit() }
  adminProducts() { this.adminProductsEvent.emit() }

  // customer signals
  custCart() { this.custCartEvent.emit(); }
  custShop() { this.custShopEvent.emit(); }
  custOrders() { this.custOrdersEvent.emit(); }

  logout() {
    this.logoutEvent.emit();
  }
}
