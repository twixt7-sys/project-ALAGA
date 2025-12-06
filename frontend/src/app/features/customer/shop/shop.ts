import { Component } from '@angular/core';
import { ShopServices } from '../../../core/services/features/shop-services';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { AuthServices } from '../../../core/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComponentsModule } from '../../../shared/components/components-module';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop {

  products: Product[] = [];
  filtered: Product[] = [];

  searchTerm = '';

  constructor(
    private shopService: ShopServices,
    private authService: AuthServices,
    private productService: ProductService,
    private router: Router
  ) {
    this.productService.getProducts().subscribe(list => {
      this.products = list;
      this.filtered = list;
      this.categories = ['All', ...new Set(this.products.map(p => p.category))];
    });
  }

  categories = ['All', ...new Set(this.products.map(p => p.category))];

  activeCategory = 'All';

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
