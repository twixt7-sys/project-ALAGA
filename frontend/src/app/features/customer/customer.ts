import { Component } from '@angular/core';
import { Shop } from './shop/shop';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [Shop],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {

}
