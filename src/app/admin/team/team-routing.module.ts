import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';

const routes: Routes = [{ path: '', component: TeamComponent },
{
  path: 'member-profile',
  loadChildren: () =>
    import('./team-profile/team-profile.module').then((m) => m.TeamProfileModule),
},
{
  path: 'invitations-sent',
  loadChildren: () =>
    import('./invitations-sent/invitations-sent.module').then((m) => m.InvitationsSentModule),
},
{
  path: 'invitations-received',
  loadChildren: () =>
    import('./invitations-received/invitations-received.module').then((m) => m.InvitationsReceivedModule),
},
{
  path: 'chat',
  loadChildren: () =>
    import('./chat/chat.module').then((m) => m.ChatModule),
},
/* check invitation */
{
  path: 'invitations/check-invitation',
  loadChildren: () =>
    import('./check-invitations/check-invitations.module').then((m) => m.CheckInvitationsModule),
},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamRoutingModule { }
