import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services';

@Component({
  selector: 'app-productss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products: Product[] = [];
  showModal = false;
  isEdit = false;

  form: any = {};

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  openCreate() {
    this.isEdit = false;
    this.form = {
      name: '',
      category: '',
      price: 0,
      stockQuantity: 0,
      imageUrl: '',
      description: ''
    };
    this.showModal = true;
  }

  openEdit(product: Product) {
    this.isEdit = true;
    this.form = { ...product };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

saveProduct() {
  const data = {
    name: this.form.name,
    category: this.form.category,
    price: this.form.price,
    stockQuantity: this.form.stockQuantity,
    imageUrl: this.form.imageUrl,
    description: this.form.description
  };

  const request = this.isEdit
    ? this.productService.updateProduct(this.form.id, data)
    : this.productService.createProduct(data);

  request.subscribe({
    next: () => {
      Swal.fire('Success', 'Product saved', 'success');
      this.closeModal();
      this.loadProducts();
    },
    error: err => Swal.fire('Error', err.message, 'error')
  });
}


  confirmDelete(product: Product) {
    Swal.fire({
      title: 'Delete product?',
      text: product.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8B6B4F'
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product.id).subscribe(() => {
          Swal.fire('Deleted', 'Product removed', 'success');
          this.loadProducts();
        });
      }
    });
  }
}
