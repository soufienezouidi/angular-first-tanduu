import { TestBed } from '@angular/core/testing';

import { OrdersSentService } from './orders-sent.service';

describe('OrdersSentService', () => {
  let service: OrdersSentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersSentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
