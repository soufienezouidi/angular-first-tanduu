import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancingListRoutingModule } from './balancing-list-routing.module';
import { BalancingListComponent } from './balancing-list.component';


@NgModule({
  declarations: [BalancingListComponent],
  imports: [
    CommonModule,
    BalancingListRoutingModule
  ]
})
export class BalancingListModule { }
