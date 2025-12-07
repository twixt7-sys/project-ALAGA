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
  //admin nav items
  @Output() goToDashboardEvent = new EventEmitter<void>();
  @Output() goToAdminOrdersEvent = new EventEmitter<void>();
  @Output() goToInventoryEvent = new EventEmitter<void>();

  //customer nav items
  @Output() goToCartEvent = new EventEmitter<void>();
  @Output() goToShopEvent = new EventEmitter<void>();
  @Output() goToAOrdersEvent = new EventEmitter<void>();

  @Output() logoutEvent = new EventEmitter<void>();

  @Input() classAppend: string = '';
  @Input() user: any = {};

  constructor(private router: Router) {}

  goToCart() {
    this.goToCartEvent.emit();
  }

  goToAdminOrders() {
    this.goToCartEvent.emit();
  }

  goToShop() {
    this.goToCartEvent.emit();
  }

  logout() {
    this.logoutEvent.emit();
  }
}
