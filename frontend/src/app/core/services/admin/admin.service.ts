import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private base = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  getSalesReport() {
    return this.http.get<any[]>(`${this.base}/sales`);
  }

  getInventory() {
    return this.http.get(`${this.base}/inventory`);
  }
}
