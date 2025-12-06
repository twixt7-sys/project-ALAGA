import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Output() logoutEvent = new EventEmitter<void>();

  @Input() classAppend: string = '';

  user = {
    username: 'customer1',
    role: 'customer'
  };

  constructor(private router: Router) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToShop() {
    this.router.navigate(['/shop']);
  }

  logout() {
    this.logoutEvent.emit();
  }
}
