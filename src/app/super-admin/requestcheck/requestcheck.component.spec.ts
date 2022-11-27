import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestcheckComponent } from './requestcheck.component';

describe('RequestcheckComponent', () => {
  let component: RequestcheckComponent;
  let fixture: ComponentFixture<RequestcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestcheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
