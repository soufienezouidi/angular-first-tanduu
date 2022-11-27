import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsSentComponent } from './invitations-sent.component';

describe('InvitationsSentComponent', () => {
  let component: InvitationsSentComponent;
  let fixture: ComponentFixture<InvitationsSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationsSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationsSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
