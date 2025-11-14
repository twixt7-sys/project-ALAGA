import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {

  login() {
    return "login works!"; //to develop
  }

  logout() {
    return "logout works!"; //to develop
  }

  register() {
    return "register works!"; //to develop
  }

  isLoggedIn() {
    if (!localStorage.getItem('userId')) {
      inject(Router).navigate(['/login']);
      return false;
    }
    return true;
  }

  getRole() {
    return 'admin'; //to develop
  }
}
