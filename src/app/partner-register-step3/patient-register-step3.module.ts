import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegisterStep3RoutingModule } from './patient-register-step3-routing.module';
import { PatientRegisterStep3Component } from './patient-register-step3.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [PatientRegisterStep3Component],
  imports: [
    CommonModule,
    PatientRegisterStep3RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ],
})
export class PatientRegisterStep3Module {}
