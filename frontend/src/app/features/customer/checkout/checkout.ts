import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
product_id: number;
name: string;
price: number;
quantity: number;
}

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  deliveryForm!: FormGroup;
  // stub sample cart items - replace with your CartService injection to get live cart
cartItems: CartItem[] = [
// Example items. In production, fetch from CartService.
{ product_id: 1, name: 'Premium Dog Food Bowl Set', price: 24.99, quantity: 1 },
{ product_id: 2, name: 'Interactive Cat Toy Bundle', price: 15.99, quantity: 1 },
{ product_id: 3, name: 'Pet Grooming Kit Professional', price: 34.99, quantity: 1 },
{ product_id: 4, name: 'Adjustable Leather Dog Collar', price: 18.99, quantity: 1 }
];


placing = false;

constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}
ngOnInit(): void {
  this.deliveryForm = this.fb.group({
  fullName: ['', [Validators.required, Validators.minLength(2)]],
  phone: ['', [Validators.required, Validators.minLength(6)]],
  street: ['', Validators.required],
  city: ['', Validators.required],
  postalCode: ['', Validators.required],
  notes: ['']
});
}




get subtotal() {
return this.cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
}


get f() {
return this.deliveryForm.controls;
}


currency(amount: number) {
return '$' + amount.toFixed(2);
}


backToCart() {
// navigate back to cart page - adjust route as necessary
this.router.navigate(['/cart']);
}


async placeOrder() {
if (this.deliveryForm.invalid) {
this.deliveryForm.markAllAsTouched();
return;
}


if (this.cartItems.length === 0) {
alert('Your cart is empty.');
return;
}


this.placing = true;


const payload = {
user_id: null, // fill with logged in user id from auth state
delivery: this.deliveryForm.value,
items: this.cartItems.map(i => ({ product_id: i.product_id, quantity: i.quantity }))
};


try {
// Use your real endpoint: POST /checkout or /orders/checkout depending on backend
await this.http.post('/api/orders/checkout', payload).toPromise();


// On success: clear cart (call CartService), navigate to order confirmation
// this.cartService.clear();
this.router.navigate(['/orders']);
} catch (err) {
console.error(err);
alert('Something went wrong while placing the order. Please try again.');
} finally {
this.placing = false;
}
}
}
