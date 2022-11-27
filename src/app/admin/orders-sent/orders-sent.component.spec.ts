import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSentComponent } from './orders-sent.component';

describe('OrdersSentComponent', () => {
  let component: OrdersSentComponent;
  let fixture: ComponentFixture<OrdersSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
