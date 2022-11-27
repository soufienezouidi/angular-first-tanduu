import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorChangePasswordRoutingModule } from './doctor-change-password-routing.module';
import { DoctorChangePasswordComponent } from './doctor-change-password.component';


@NgModule({
  declarations: [DoctorChangePasswordComponent],
  imports: [
    CommonModule,
    DoctorChangePasswordRoutingModule
  ]
})
export class DoctorChangePasswordModule { }
