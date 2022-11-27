import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsChangePasswordComponent } from './patients-change-password.component';

describe('PatientsChangePasswordComponent', () => {
  let component: PatientsChangePasswordComponent;
  let fixture: ComponentFixture<PatientsChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
