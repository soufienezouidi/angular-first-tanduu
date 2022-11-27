import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInvitationsComponent } from './check-invitations.component';

describe('CheckInvitationsComponent', () => {
  let component: CheckInvitationsComponent;
  let fixture: ComponentFixture<CheckInvitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInvitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
