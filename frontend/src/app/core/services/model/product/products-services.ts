import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private base = 'http://localhost:5000//api/products';

  constructor(private http: HttpClient) {}

  updateProductStock(productId: number, data: any): Observable<any> {
    return this.http.put(
      `${this.base}/${productId}`,
      data
    );
  }

  updateProduct(
    productId: number,
    data: Partial<{
      name: string;
      description: string;
      category: string;
      price: number;
      stockQuantity: number;
      imageUrl: string;
    }>
  ): Observable<Product> {
    return this.http
      .put<any>(`${this.base}/${productId}`, this.mapToApi(data))
      .pipe(map(p => this.mapFromApi(p)));
  }

  getProducts() {
    return this.http.get<any[]>(`${this.base}/`).pipe(
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

    getProductById(productId: number): Observable<Product> {
    return this.http
      .get<any>(`${this.base}/${productId}`)
      .pipe(map(p => this.mapFromApi(p)));
  }

    deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${productId}`);
  }



    // API → Angular
  private mapFromApi(p: any): Product {
    return {
      id: p.product_id,
      name: p.name,
      description: p.description,
      category: p.category,
      price: p.price,
      stockQuantity: p.stock_quantity,
      imageUrl: p.image_url,
      dateAdded: p.date_added,
    };
  }

  // Angular → API
  private mapToApi(data: any) {
    return {
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      stock_quantity: data.stockQuantity,
      image_url: data.imageUrl,
    };
  }

    createProduct(data: {
    name: string;
    description?: string;
    category: string;
    price: number;
    stockQuantity: number;
    imageUrl?: string;
  }): Observable<Product> {
    return this.http
      .post<any>(`${this.base}/`, this.mapToApi(data))
      .pipe(map(p => this.mapFromApi(p)));
  }
}
