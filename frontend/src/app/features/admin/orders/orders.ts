import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Order, OrderStatus } from '../../../core/models/order.model';
import { OrderServices } from '../../../core/services';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  orders: Order[] = [];
  showModal = false;

  selectedOrder: Order | null = null;
  selectedStatus: OrderStatus = 'Pending';

  constructor(private orderService: OrderServices) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
  this.orderService.getAllOrders().subscribe({
    next: orders => (this.orders = orders),
    error: err => Swal.fire('Error', err.message, 'error')
  });
}

  openOrder(order: Order) {
    this.selectedOrder = order;
    this.selectedStatus = order.status;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedOrder = null;
  }

  updateStatus() {
    if (!this.selectedOrder) return;

    this.orderService
      .updateOrderStatus(this.selectedOrder.id, {
        status: this.selectedStatus.toLowerCase()
      })
      .subscribe({
        next: () => {
          Swal.fire('Updated', 'Order status updated', 'success');
          this.closeModal();
          this.loadOrders();
        },
        error: err => Swal.fire('Error', err.message, 'error')
      });
  }
}
