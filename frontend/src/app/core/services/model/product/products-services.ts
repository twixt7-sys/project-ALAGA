import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../../../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private base = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get<any[]>(`${this.base}`).pipe(
      map(list =>
        list.map(p => {
          const mapped: Product = {
            id: p.product_id,
            name: p.name,
            description: p.description,
            category: p.category,
            price: p.price,
            stockQuantity: p.stock_quantity,
            imageUrl: p.image_url,
            dateAdded: p.date_added
          };
          return mapped;
        })
      )
    );
  }
}
