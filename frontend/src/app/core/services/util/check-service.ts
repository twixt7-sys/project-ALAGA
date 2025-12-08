import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CheckService {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  checkUser(): boolean{
    if (!this.user?.user_id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `User not found :(`,
      });
      return true;
    }
    return false;
  }
}
