import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CrmComponent],
  imports: [
    CommonModule,
    CrmRoutingModule,
    FormsModule

  ]
})
export class CrmModule { }
