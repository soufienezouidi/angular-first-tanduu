import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegisterPartnerComponent } from './pre-register-partner.component';

describe('PreRegisterPartnerComponent', () => {
  let component: PreRegisterPartnerComponent;
  let fixture: ComponentFixture<PreRegisterPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRegisterPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRegisterPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
