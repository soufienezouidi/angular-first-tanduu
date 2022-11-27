import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunServicesListComponent } from './commun-services-list.component';

describe('CommunServicesListComponent', () => {
  let component: CommunServicesListComponent;
  let fixture: ComponentFixture<CommunServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunServicesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
