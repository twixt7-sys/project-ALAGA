import { Injectable } from '@angular/core';
import { UserRole } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  role(isAdmin: boolean): UserRole {
    return isAdmin ? 'admin' : 'customer';
  }
}
