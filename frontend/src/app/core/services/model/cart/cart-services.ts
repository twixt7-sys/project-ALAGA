import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private root = 'http://localhost:5000/api';
  private base = `${this.root}/cart`;
  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.base}`);
  }

  addItem(product_id: number, quantity = 1) {
    return this.http.post(`${this.base}/items`, {
      product_id,
      quantity
    });
  }

  updateItem(cart_item_id: number, quantity: number) {
    return this.http.put(`${this.base}/items/${cart_item_id}`, {
      quantity
    });
  }

  removeItem(cart_item_id: number) {
    return this.http.delete(`${this.base}/items/${cart_item_id}`);
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.root}/orders/checkout`, {});
  }
}
