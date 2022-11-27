import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationsSentComponent } from './invitations-sent.component';

const routes: Routes = [{ path: '', component: InvitationsSentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationsSentRoutingModule { }
