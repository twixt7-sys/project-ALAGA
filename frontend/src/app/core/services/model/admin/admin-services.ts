import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminServices {

  private base = 'http://localhost:5000//api/admin/';

  constructor(private http: HttpClient) {}
  // admin.service.ts
  restockProduct(productId: number, quantity: number) {
    return this.http.post(
      `${this.base}/restock`,
      { product_id: productId, quantity }
    );
  }

  getInventory() {
    return this.http.get<any[]>(`${this.base}inventory`);
  }
}
