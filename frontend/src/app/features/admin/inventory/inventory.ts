import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../../../core/services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  restockQty = 0;
  showModal = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openRestock(product: any) {
    this.selectedProduct = product;
    this.restockQty = 0;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

  confirmRestock() {
    if (!this.selectedProduct || this.restockQty <= 0) {
      Swal.fire('Invalid quantity', 'Enter a valid number', 'warning');
      return;
    }

    const updatedStock =
      this.selectedProduct.stockQuantity + this.restockQty;

    this.productService
      .updateProductStock(this.selectedProduct.id, {
        stock_quantity: updatedStock
      })
      .subscribe({
        next: () => {
          Swal.fire('Restocked', 'Inventory updated', 'success');
          this.closeModal();
          this.loadInventory();
        },
        error: (err) => {
          Swal.fire('Error', err.message, 'error');
        }
      });
  }
}
