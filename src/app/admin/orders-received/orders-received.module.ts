import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersReceivedRoutingModule } from './orders-received-routing.module';
import { OrdersReceivedComponent } from './orders-received.component';


@NgModule({
  declarations: [OrdersReceivedComponent],
  imports: [
    CommonModule,
    OrdersReceivedRoutingModule
  ]
})
export class OrdersReceivedModule { }
