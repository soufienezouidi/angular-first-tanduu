import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcitypartnersComponent } from './allcitypartners.component';

describe('AllcitypartnersComponent', () => {
  let component: AllcitypartnersComponent;
  let fixture: ComponentFixture<AllcitypartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcitypartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcitypartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
