import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInvitationsRoutingModule } from './check-invitations-routing.module';
import { CheckInvitationsComponent } from './check-invitations.component';


@NgModule({
  declarations: [CheckInvitationsComponent],
  imports: [
    CommonModule,
    CheckInvitationsRoutingModule
  ]
})
export class CheckInvitationsModule { }
