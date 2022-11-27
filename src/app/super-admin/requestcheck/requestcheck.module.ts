import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestcheckRoutingModule } from './requestcheck-routing.module';
import { RequestcheckComponent } from './requestcheck.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [RequestcheckComponent],
  imports: [
    CommonModule,
    RequestcheckRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgMultiSelectDropDownModule,
  ],
})
export class RequestcheckModule {}
