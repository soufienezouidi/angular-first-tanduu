import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressServicesComponent } from './express-services.component';

describe('ExpressServicesComponent', () => {
  let component: ExpressServicesComponent;
  let fixture: ComponentFixture<ExpressServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
