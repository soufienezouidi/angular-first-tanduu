import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamProfileComponent } from './team-profile.component';

const routes: Routes = [{ path: '', component: TeamProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamProfileRoutingModule { }
