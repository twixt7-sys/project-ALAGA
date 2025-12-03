import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private base = '/api/orders';

  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<any[]>(`${this.base}`);
  }
}
