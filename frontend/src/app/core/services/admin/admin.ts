import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Admin {
  private base = '/api/admin';

  constructor(private http: HttpClient) {}

  getSalesReport() {
    return this.http.get(`${this.base}/reports/sales`);
  }

  getInventory() {
    return this.http.get(`${this.base}/inventory`);
  }
}
