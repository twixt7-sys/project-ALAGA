import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Products {
  getProducts(): Observable<any>{
    return new Observable(observer => {
      observer.next(["Product 1", "Product 2", "Product 3"]);
      observer.complete();
    });
  }
}
