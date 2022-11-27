import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalDetailsRoutingModule } from './medical-details-routing.module';
import { MedicalDetailsComponent } from './medical-details.component';


@NgModule({
  declarations: [MedicalDetailsComponent],
  imports: [
    CommonModule,
    MedicalDetailsRoutingModule
  ]
})
export class MedicalDetailsModule { }
