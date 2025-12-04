import { TestBed } from '@angular/core/testing';

import { ShopServices } from './shop-services';

describe('Shop', () => {
  let service: ShopServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
