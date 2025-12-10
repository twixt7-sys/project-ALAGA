import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../../../core/models/order.model';
import { OrderItem } from '../../../core/models/order-item.model';
import { CheckService, OrderServices } from '../../../core/services';
import { User } from '../../../core/models/user.model';
import Swal from 'sweetalert2';

interface CartProduct extends OrderItem {
  name: string;
  image: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  orders: Order[] = [];

  loading = true;
  error = false;

  constructor(
    private orderService: OrderServices,
    private checkService: CheckService
  ) {}

  ngOnInit(): void {
    if (this.checkService.userNotFound()) {
      this.loading = false;
      return;
    }

    this.orderService.getMyOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message || 'Failed to load orders'
        });
        this.error = true;
        this.loading = false;
      }
    });
  }

  currency(amount: number): string {
    if (typeof amount !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Pending': 'status-pending',
      'Processing': 'status-processing',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return statusMap[status] || '';
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
}
