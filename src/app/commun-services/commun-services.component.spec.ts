import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunServicesComponent } from './commun-services.component';

describe('CommunServicesComponent', () => {
  let component: CommunServicesComponent;
  let fixture: ComponentFixture<CommunServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
