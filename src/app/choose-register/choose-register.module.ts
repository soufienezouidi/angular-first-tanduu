import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseRegisterRoutingModule } from './choose-register-routing.module';
import { ChooseRegisterComponent } from './choose-register.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ChooseRegisterComponent],
  imports: [
    CommonModule,
    ChooseRegisterRoutingModule,
    SharedModule
  ]
})
export class ChooseRegisterModule { }
