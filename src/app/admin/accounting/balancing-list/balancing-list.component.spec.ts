import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancingListComponent } from './balancing-list.component';

describe('BalancingListComponent', () => {
  let component: BalancingListComponent;
  let fixture: ComponentFixture<BalancingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
