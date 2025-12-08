import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  private base = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  getOrdersByUser(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.base).pipe(
      map(list =>
        list.filter(o => o.userId === userId).map(o => ({
          id: o.id,
          userId: o.userId,
          orderDate: o.orderDate,
          totalAmount: o.totalAmount,
          status: o.status,
          items: o.items ?? []
        }))
      )
    );
  }
}
