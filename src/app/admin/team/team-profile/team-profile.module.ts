import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamProfileRoutingModule } from './team-profile-routing.module';
import { TeamProfileComponent } from './team-profile.component';


@NgModule({
  declarations: [TeamProfileComponent],
  imports: [
    CommonModule,
    TeamProfileRoutingModule
  ]
})
export class TeamProfileModule { }
