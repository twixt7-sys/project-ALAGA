import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  private products: Product[] = [
    {
      id: 1,
      name: 'Premium Dog Food Bowl Set',
      description: 'Stainless steel non slip dog food and water bowl set. Perfect for medium to large dogs.',
      category: 'Food & Bowls',
      price: 24.99,
      stockQuantity: 40,
      imageUrl: 'assets/images/dogbowl.jpg',
      dateAdded: '2024-06-10'
    },
    {
      id: 2,
      name: 'Interactive Cat Toy Bundle',
      description: 'A bundle of 5 interactive toys to keep your cat entertained.',
      category: 'Toys',
      price: 15.99,
      stockQuantity: 80,
      imageUrl: 'assets/images/cattoys.jpg',
      dateAdded: '2024-06-08'
    },
    {
      id: 3,
      name: 'Pet Grooming Kit Professional',
      description: 'Complete grooming kit with brushes and nail clippers.',
      category: 'Grooming',
      price: 34.99,
      stockQuantity: 25,
      imageUrl: 'assets/images/grooming.jpg',
      dateAdded: '2024-06-01'
    },
    {
      id: 4,
      name: 'Adjustable Leather Dog Collar',
      description: 'Premium leather collar with adjustable fit.',
      category: 'Accessories',
      price: 18.99,
      stockQuantity: 60,
      imageUrl: 'assets/images/dogcollar.jpg',
      dateAdded: '2024-05-30'
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
