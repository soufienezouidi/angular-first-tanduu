import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRecordsRoutingModule } from './medical-records-routing.module';
import { MedicalRecordsComponent } from './medical-records.component';


@NgModule({
  declarations: [MedicalRecordsComponent],
  imports: [
    CommonModule,
    MedicalRecordsRoutingModule
  ]
})
export class MedicalRecordsModule { }
