import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inventory } from './inventory';

describe('Inventory', () => {
  let component: Inventory;
  let fixture: ComponentFixture<Inventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Inventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
