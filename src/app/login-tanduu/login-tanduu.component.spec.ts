import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTanduuComponent } from './login-tanduu.component';

describe('LoginTanduuComponent', () => {
  let component: LoginTanduuComponent;
  let fixture: ComponentFixture<LoginTanduuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTanduuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTanduuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
