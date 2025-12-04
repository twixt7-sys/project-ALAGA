import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopServices } from '../../core/services/features/shop-services';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private shopService: ShopServices) {
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
}
