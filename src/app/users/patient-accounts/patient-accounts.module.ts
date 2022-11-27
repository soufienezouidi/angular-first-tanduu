import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientAccountsRoutingModule } from './patient-accounts-routing.module';
import { PatientAccountsComponent } from './patient-accounts.component';


@NgModule({
  declarations: [PatientAccountsComponent],
  imports: [
    CommonModule,
    PatientAccountsRoutingModule
  ]
})
export class PatientAccountsModule { }
