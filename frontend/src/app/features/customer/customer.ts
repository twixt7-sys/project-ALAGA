import { Component } from '@angular/core';
import { Shop } from './shop/shop';
import { ComponentsModule } from '../../shared/components/components-module';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [Shop, ComponentsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {

}
