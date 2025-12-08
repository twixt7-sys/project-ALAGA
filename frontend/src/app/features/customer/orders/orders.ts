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

    this.orderService.getOrdersByUser(this.user.user_id).subscribe({
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
}
