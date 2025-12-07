import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  order_id: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  items: OrderItem[];
  total: number;
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
      order_id: 3,
      date: 'November 2, 2025 at 03:04 PM',
      status: 'Pending',
      items: [
        { name: 'Premium Dog Food Bowl Set', quantity: 1, price: 24.99 },
        { name: 'Interactive Cat Toy Bundle', quantity: 1, price: 15.99 },
      ],
      total: 40.98,
    },
    {
      order_id: 4,
      date: 'November 2, 2025 at 03:04 PM',
      status: 'Pending',
      items: [
        { name: 'Pet Grooming Kit Professional', quantity: 2, price: 34.99 },
        { name: 'Interactive Cat Toy Bundle', quantity: 4, price: 15.99 },
      ],
      total: 133.94,
    },
  ];

  currency(amount: number) {
    return '$' + amount.toFixed(2);
  }
}
