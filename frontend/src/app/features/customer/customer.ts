import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {
  name: string = '';
  setValue() {
    this.name = '';
  }
}
