import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCredentials } from './demo-credentials';

describe('DemoCredentials', () => {
  let component: DemoCredentials;
  let fixture: ComponentFixture<DemoCredentials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoCredentials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoCredentials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
