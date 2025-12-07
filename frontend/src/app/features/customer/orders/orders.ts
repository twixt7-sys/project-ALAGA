import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../../../core/models/order.model';
import { OrderItem } from '../../../core/models/order-item.model';

interface CartProduct extends OrderItem {
  name: string;
  image: string;
}

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  orders: Order[] = [
    {
      id: 3,
      userId: 1,
      orderDate: '2025-11-02T15:04:00',
      totalAmount: 40.98,
      status: 'Pending',
      items: [
        {
          id: 1,
          orderId: 3,
          productId: 101,
          quantity: 1,
          priceAtPurchase: 24.99
        },
        {
          id: 2,
          orderId: 3,
          productId: 102,
          quantity: 1,
          priceAtPurchase: 15.99
        }
      ]
    },
    {
      id: 4,
      userId: 1,
      orderDate: '2025-11-02T15:04:00',
      totalAmount: 133.94,
      status: 'Pending',
      items: [
        {
          id: 3,
          orderId: 4,
          productId: 103,
          quantity: 2,
          priceAtPurchase: 34.99
        },
        {
          id: 4,
          orderId: 4,
          productId: 102,
          quantity: 4,
          priceAtPurchase: 15.99
        }
      ]
    }
  ];

  formatDate(date: string) {
    return new Date(date).toLocaleString();
  }

  currency(value: number) {
    return '$' + value.toFixed(2);
  }

  getStatusClass(status: string) {
    return status.toLowerCase();
  }
}
