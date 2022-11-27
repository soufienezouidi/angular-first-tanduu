import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsChangePasswordRoutingModule } from './patients-change-password-routing.module';
import { PatientsChangePasswordComponent } from './patients-change-password.component';


@NgModule({
  declarations: [PatientsChangePasswordComponent],
  imports: [
    CommonModule,
    PatientsChangePasswordRoutingModule
  ]
})
export class PatientsChangePasswordModule { }
