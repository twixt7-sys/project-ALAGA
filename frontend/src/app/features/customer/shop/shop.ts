import { Component, Input } from '@angular/core';
import { ShopServices } from '../../../core/services/features/shop-services';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { AuthServices, CartServices } from '../../../core/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComponentsModule } from '../../../shared/components/components-module';
import { ProductService } from '../../../core/services';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop {
  @Input() product: any = {};

  products: Product[] = [];
  filtered: Product[] = [];

  currentPage = 1;
  pageSize = 28;
  totalPages = 1;
  paginated: Product[] = [];

  searchTerm = '';

  constructor(
    private shopService: ShopServices,
    private authService: AuthServices,
    private productService: ProductService,
    private router: Router,
    private cartService: CartServices
  ) {
    this.productService.getProducts().subscribe(list => {
      this.products = list;
      this.filtered = list;
      this.categories = ['All', ...new Set(this.products.map(p => p.category))];

      this.totalPages = Math.ceil(this.filtered.length / this.pageSize);
      this.updatePage();
    });
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
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

    this.totalPages = Math.ceil(this.filtered.length / this.pageSize);
    this.currentPage = 1; // reset page on new filter
    this.updatePage();
  }


  viewProduct(p: Product) {
    this.product = p;
    (window as any).dialog.showModal();
  }

  addToCart(product: Product) {
    this.cartService.addItem({
      product_id: product.id,
      quantity: 1
    }).subscribe({
      next: (res) => {
        Swal.fire({
          title: "Success!",
          text: `${product.name} added to cart!`,
          icon: "success"
        });
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.message}`,
          footer: `<a href="#">Why do I have this issue?</a>`
        });
      }
    })
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginated = this.filtered.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

}
