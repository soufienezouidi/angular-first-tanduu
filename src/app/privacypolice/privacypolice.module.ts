import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacypoliceRoutingModule } from './privacypolice-routing.module';
import { PrivacypoliceComponent } from './privacypolice.component';


@NgModule({
  declarations: [PrivacypoliceComponent],
  imports: [
    CommonModule,
    PrivacypoliceRoutingModule
  ]
})
export class PrivacypoliceModule { }
