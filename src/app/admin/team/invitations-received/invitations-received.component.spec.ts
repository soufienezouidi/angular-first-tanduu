import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsReceivedComponent } from './invitations-received.component';

describe('InvitationsReceivedComponent', () => {
  let component: InvitationsReceivedComponent;
  let fixture: ComponentFixture<InvitationsReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationsReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
