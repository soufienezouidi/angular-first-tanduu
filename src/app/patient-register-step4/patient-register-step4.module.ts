import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegisterStep4RoutingModule } from './patient-register-step4-routing.module';
import { PatientRegisterStep4Component } from './patient-register-step4.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PatientRegisterStep4Component],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,
    PatientRegisterStep4RoutingModule,
  ],
})
export class PatientRegisterStep4Module {}
