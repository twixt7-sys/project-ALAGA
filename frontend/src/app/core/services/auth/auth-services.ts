import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from '../model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private base = 'http://localhost:5000/api/auth';

  constructor (
    private http: HttpClient
  ){}

  login(data: any): Observable<any> {
    return this.http.post(`${this.base}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.base}/logout`, {})
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.base}/register`, data);
  }

  isLoggedIn() {
    if (!localStorage.getItem('userId')) {
      inject(Router).navigate(['/login']);
      return false;
    }
    return true;
  }

  getRole() {
    return inject(UserServices).role(true);
  }
}
