import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBalanceRoutingModule } from './view-balance-routing.module';
import { ViewBalanceComponent } from './view-balance.component';


@NgModule({
  declarations: [ViewBalanceComponent],
  imports: [
    CommonModule,
    ViewBalanceRoutingModule
  ]
})
export class ViewBalanceModule { }
