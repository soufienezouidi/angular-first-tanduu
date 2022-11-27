import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InvitationsReceivedRoutingModule } from './invitations-received-routing.module';
import { InvitationsReceivedComponent } from './invitations-received.component';


@NgModule({
  declarations: [InvitationsReceivedComponent],
  imports: [
    CommonModule,
    InvitationsReceivedRoutingModule,
    FormsModule
  ]
})
export class InvitationsReceivedModule { }
