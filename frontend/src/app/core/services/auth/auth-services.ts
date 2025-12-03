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
    return !!localStorage.getItem('userId');
  }

  getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const payload = this.decodeToken(token);
    if (!payload) return null;

    return {
      userId: payload.userId || payload.sub,
      role: payload.role
    };
  }

  private decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  
}
