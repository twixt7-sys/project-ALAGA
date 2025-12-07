import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private base = 'http://localhost:5000/api/cart';
  constructor(private http: HttpClient) {}

  addItem(data: any): Observable<any> {
    return this.http.post(`${this.base}/items`, data);
  }
}
