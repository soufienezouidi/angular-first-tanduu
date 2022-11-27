import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationsReceivedComponent } from './invitations-received.component';

const routes: Routes = [{ path: '', component: InvitationsReceivedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationsReceivedRoutingModule { }
