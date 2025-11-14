import { Injectable } from '@angular/core';

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
    return true; //to develop
  }

  getRole() {
    return 'admin'; //to develop
  }
}
