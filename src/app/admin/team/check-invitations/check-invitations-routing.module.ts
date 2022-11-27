import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInvitationsComponent } from './check-invitations.component';

const routes: Routes = [{ path: '', component: CheckInvitationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckInvitationsRoutingModule { }
