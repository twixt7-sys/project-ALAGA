import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from '../model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// handles API calls
@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  constructor (
    private http: HttpClient
  ){}

  login(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/api/auth/login', data);
  }

  logout(): Observable<any> {
    return this.http.post('/logout', {})
  }

  register(data: any): Observable<any> {
    return this.http.post('/register', data);
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
