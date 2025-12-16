import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Order } from '../../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  private base = 'http://localhost:5000/api/orders/';
  private ordersUpdatedSource = new Subject<void>();
  ordersUpdated$ = this.ordersUpdatedSource.asObservable();

  notifyOrdersUpdated() {
    this.ordersUpdatedSource.next();
  }

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/orders').pipe(
      map(list =>
        list.map(o => ({
          order_id: o.order_id,
          order_date: o.order_date,
          total_amount: Number(o.total_amount),
          status: this.normalizeStatus(o.status)
        }))
      )
    );
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<any[]>('http://localhost:5000/api/orders').pipe(
      map(list =>
        list.map(o => ({
          id: o.order_id,
          userId: o.user_id,
          orderDate: o.order_date,
          totalAmount: o.total_amount,
          status: this.normalizeStatus(o.status),
          items: (o.order_items || []).map((i: any) => ({
            id: i.order_item_id,
            orderId: i.order_id,
            productId: i.product_id,
            quantity: i.quantity,
            priceAtPurchase: i.price_at_purchase
          }))
        }))
      )
    );
  }

  private normalizeStatus(status: string){
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  }
}
