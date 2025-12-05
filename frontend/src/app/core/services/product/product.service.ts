import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private base = 'http://localhost:5000//api/products/';

  constructor(private http: HttpClient) {}
  getProducts() {
  return this.http.get<any[]>(`${this.base}`).pipe(
    map(list =>
      list.map(p => ({
        id: p.product_id,
        name: p.name,
        description: p.description,
        category: p.category,
        price: p.price,
        imageUrl: p.image_url,
        stockQuantity: p.stock_quantity,
        dateAdded: p.date_added
      }))
    )
  );
}
}
