import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreRegisterPartnerRoutingModule } from './pre-register-partner-routing.module';
import { PreRegisterPartnerComponent } from './pre-register-partner.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PreRegisterPartnerComponent],
  imports: [
    CommonModule,
    PreRegisterPartnerRoutingModule,
    SharedModule
  ]
})
export class PreRegisterPartnerModule { }
