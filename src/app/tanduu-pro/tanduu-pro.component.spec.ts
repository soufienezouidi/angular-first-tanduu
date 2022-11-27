import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanduuProComponent } from './tanduu-pro.component';

describe('TanduuProComponent', () => {
  let component: TanduuProComponent;
  let fixture: ComponentFixture<TanduuProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TanduuProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TanduuProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
