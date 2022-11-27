import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegisterStep2RoutingModule } from './patient-register-step2-routing.module';
import { PatientRegisterStep2Component } from './patient-register-step2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PatientRegisterStep2Component],
  imports: [
    PatientRegisterStep2RoutingModule,
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PatientRegisterStep2Module {}
