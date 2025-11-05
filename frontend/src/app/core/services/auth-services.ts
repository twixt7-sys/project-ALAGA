import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  login() {
    return "login works!";
  }

  logout() {
    return "logout works!";
  }

  register() {
    return "register works!";
  }
}
