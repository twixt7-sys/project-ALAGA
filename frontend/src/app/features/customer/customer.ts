import { Component, Input } from '@angular/core';
import { ShopServices } from '../../core/services/features/shop-services';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { AuthServices } from '../../core/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComponentsModule } from '../../shared/components/components-module';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {
  name: string = '';
  setValue() {
    this.name = '';
  }
  products: Product[] = [];
  filtered: Product[] = [];

  searchTerm = '';

  categories = [
    'All',
    'Food & Bowls',
    'Toys',
    'Grooming',
    'Accessories',
    'Beds & Furniture',
    'Fish & Aquatic',
    'Birds',
    'Small Animals',
    'Litter & Cleanup'
  ];

  activeCategory = 'All';

  constructor(
    private shopService: ShopServices,
    private authService: AuthServices,
    private router: Router
  ) {
    this.shopService.getProducts().subscribe(list => {
      this.products = list;
      this.filtered = list;
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilters();
  }

  filterCategory(cat: string) {
    this.activeCategory = cat;
    this.applyFilters();
  }

  applyFilters() {
    let temp = [...this.products];

    if (this.activeCategory !== 'All') {
      temp = temp.filter(p => p.category === this.activeCategory);
    }

    if (this.searchTerm.trim() !== '') {
      const searchLower = this.searchTerm.toLowerCase();
      temp = temp.filter(p => p.name.toLowerCase().includes(searchLower));
    }

    this.filtered = temp;
  }

    logout() {
      this.authService.logout();
      Swal.fire({
        title: "Success!",
        text: "User Logged Out!",
        icon: "success"
      });
      this.router.navigate(['/auth']);
    }
}
